import connection from "../data/db.js";
import slugify from "slugify";

const index = (req, res) => {
    const sqlImmobili = "SELECT * FROM immobili WHERE data_eliminazione IS NULL;";

    connection.query(sqlImmobili, (err, immobili) => {
        if (err) return res.status(500).json({ status: "fail", message: err });

        if (immobili.length === 0) {
            return res.status(404).json({ status: "fail", message: "Nessun immobile trovato" });
        }

        const sqlVotiMedi = 
            "SELECT id_immobile, CAST(AVG(voto) AS FLOAT) AS voto_medio FROM recensioni GROUP BY id_immobile;";

        connection.query(sqlVotiMedi, (err, voti) => {
            if (err) return res.status(500).json({ status: "fail", message: err });

            const votoMap = {};
            voti.forEach(({ id_immobile, voto_medio }) => {
                votoMap[id_immobile] = voto_medio;
            });

            // Ottenere gli slug degli immobili
            const slugs = immobili.map(immobile => immobile.slug);

            if (slugs.length === 0) {
                return res.status(200).json({
                    status: "success",
                    results: immobili.map(immobile => ({
                        ...immobile,
                        voto_medio: votoMap[immobile.id] || null,
                        immagini: []
                    })),
                });
            }

            const sqlImmagini = `
                SELECT slug_immobile, id, nome_immagine
                FROM immagini
                WHERE slug_immobile IN (?);
            `;

            connection.query(sqlImmagini, [slugs], (err, immagini) => {
                if (err) {
                    return res.status(500).json({ status: "fail", message: err });
                }

                // Raggruppare le immagini per slug_immobile
                const immaginiMap = {};
                immagini.forEach(({ slug_immobile, id, nome_immagine }) => {
                    if (!immaginiMap[slug_immobile]) {
                        immaginiMap[slug_immobile] = [];
                    }
                    immaginiMap[slug_immobile].push({ id, nome_immagine });
                });

                // Associare le immagini agli immobili corrispondenti
                const immobiliFinali = immobili.map(immobile => ({
                    ...immobile,
                    voto_medio: votoMap[immobile.id] || null,
                    immagini: immaginiMap[immobile.slug] || [],
                }));

                return res.status(200).json({
                    status: "success",
                    immobili: immobiliFinali,
                });
            });
        });
    });
};


const show = (req, res, next) => {

    const sqlId = ` SELECT immobili.id
    FROM immobili
    WHERE immobili.slug = ?`;

    const slug = req.params.slug;
    let idImmobile

    connection.query(sqlId, [slug], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }

        else if (!result) {
            return res.status(404).json({ status: "fail", message: "nessun immobile trovato" });
        }

        idImmobile = result[0].id;
        console.log(idImmobile);
    });

    let sql = `SELECT *
    FROM immobili
    WHERE immobili.slug = ?`;


    connection.query(sql, [slug], (err, immobile) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }
        else if (immobile.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `immobile con slug ${slug} non trovato.`,
            });
        }

        let sqlRecensioni = `SELECT recensioni.id, recensioni.username, recensioni.recensione, recensioni.voto, recensioni.data
        FROM immobili
        INNER JOIN recensioni
        ON recensioni.id_immobile = immobili.id
        WHERE immobili.id = ?`;

        connection.query(sqlRecensioni, idImmobile, (err, recensioni) => {
            if (err) {
                return res.status(500).json({ status: "fail", message: err });
            }

            const sqlImmagini = `
                SELECT immagini.id, immagini.nome_immagine
                FROM immagini
                WHERE slug_immobile = ?
            `;

            connection.query(sqlImmagini, [slug], (err, immagini) => {
                if (err) {
                    return res.status(500).json({ status: "fail", message: err });
                }

                const sqlTipiAlloggi = `
                    SELECT tipi_alloggio.*
                    FROM tipi_alloggio
                    INNER JOIN immobili_tipi_alloggio
                    ON tipi_alloggio.id = immobili_tipi_alloggio.tipo_alloggio_id
                    WHERE immobili_tipi_alloggio.slug_immobile = ? 
                `;

                connection.query(sqlTipiAlloggi, [slug], (err, tipiAlloggio) => {
                    if (err) {
                        return res.status(500).json({ status: "fail", message: err });
                    }

                    return res.status(200).json({
                        status: "success",
                        results: {
                            immobile: {
                                ...immobile[0],
                                recensioni: recensioni || [],
                            },
                            immagini: immagini,
                            tipi_alloggio: tipiAlloggio,
                        }
                    });
                })


            });



        })



    })
};

const destroy = (req, res) => {
    const slug = req.params.slug;

    const checkSql = `SELECT data_eliminazione FROM immobili WHERE slug = ?`;

    connection.query(checkSql, [slug], (err, results) => {
        if (err) return res.status(500).json({ status: "fail", message: err });

        if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `Nessun immobile con slug '${slug}' trovato.`,
            });
        }

        const immobile = results[0];

        if (immobile.data_eliminazione) {
            return res.status(200).json({
                message: "L'immobile è già stato eliminato.",
                dataEliminazione: immobile.data_eliminazione,
            });
        }

        const sqlUpdate = `UPDATE immobili SET data_eliminazione = NOW() WHERE slug = ?`;

        connection.query(sqlUpdate, [slug], (err) => {
            if (err) return res.status(500).json({ status: "fail", message: err });

            return res.sendStatus(204);
        });
    });
};

const store = (req, res) => {
    const { immobile, tipi_alloggio } = req.body;

    if (!immobile) {
        return res.status(400).json({ status: "fail", message: "Dati immobile mancanti" });
    }

    const {
        email_proprietario,
        username_proprietario,
        titolo_descrittivo,
        indirizzo_completo,
        descrizione,
        mq,
        bagni,
        locali,
        posti_letto,
        immagini
    } = immobile;

    // Flag per evitare risposte multiple
    let isResponseSent = false;

    // Validazione dei campi testuali
    const textFields = { titolo_descrittivo, indirizzo_completo, descrizione };
    for (const [key, value] of Object.entries(textFields)) {
        if (!value || typeof value !== "string" || value.trim().length < 3) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(400).json({ status: "fail", message: `Il campo ${key} deve contenere almeno 3 caratteri.` });
            }
        }
    }

    // Validazione email
    if (!email_proprietario || typeof email_proprietario !== "string" || email_proprietario.length < 5 || !email_proprietario.includes("@")) {
        if (!isResponseSent) {
            isResponseSent = true;
            return res.status(400).json({ status: "fail", message: "L'email deve avere almeno 5 caratteri e un formato valido." });
        }
    }

    // Validazione username
    if (!username_proprietario || typeof username_proprietario !== "string" || username_proprietario.trim().length < 2) {
        if (!isResponseSent) {
            isResponseSent = true;
            return res.status(400).json({ status: "fail", message: "Lo username deve avere almeno 2 caratteri." });
        }
    }

    // Validazione dei campi numerici
    const numberFields = { mq, bagni, locali, posti_letto };
    for (const [key, value] of Object.entries(numberFields)) {
        if (typeof value !== "number" || value < 0 || !Number.isInteger) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(400).json({ status: "fail", message: `Il campo ${key} deve essere un numero positivo.` });
            }
        }
        if (key !== mq && value < 10) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(400).json({ status: "error", message: `Il campo ${key} deve esere minore e uguale a 10.` });
            }

        }
    }

    let slug = slugify(titolo_descrittivo, { lower: true, strict: true });

    const checkSlugSql = `SELECT COUNT(*) AS count FROM immobili WHERE slug = ?`;

    connection.query(checkSlugSql, [slug], (err, result) => {
        if (err) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(500).json({ status: "fail", message: "Errore nel controllo dello slug", error: err });
            }
        }

        if (result[0].count > 0) {
            slug += `-${Date.now()}`;
        }

        const sqlInsertImmobile = `
            INSERT INTO immobili (
                email_proprietario, 
                username_proprietario, 
                titolo_descrittivo, 
                slug,
                indirizzo_completo, 
                descrizione, 
                mq, 
                bagni, 
                locali, 
                posti_letto,
                data_eliminazione
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);
        `;

        connection.query(
            sqlInsertImmobile,
            [email_proprietario, username_proprietario, titolo_descrittivo, slug, indirizzo_completo, descrizione, mq, bagni, locali, posti_letto],
            (err, result) => {
                if (err) {
                    if (!isResponseSent) {
                        isResponseSent = true;
                        return res.status(500).json({ status: "fail", message: "Errore durante l'inserimento dell'immobile", error: err });
                    }
                }

                // Verifica che lo slug esista nella tabella immobili
                const checkImmobileSlug = `SELECT slug FROM immobili WHERE slug = ?`;
                connection.query(checkImmobileSlug, [slug], (err, result) => {
                    if (err) {
                        if (!isResponseSent) {
                            isResponseSent = true;
                            return res.status(500).json({ status: "fail", message: "Errore nella verifica dello slug dell'immobile", error: err });
                        }
                    }

                    if (result.length === 0) {
                        return res.status(400).json({ status: "fail", message: "Lo slug dell'immobile non è valido" });
                    }

                    // Se lo slug esiste, continua con l'inserimento dei tipi di alloggio
                    const tipiAlloggioSql = `INSERT INTO Immobili_Tipi_Alloggio (slug_immobile, tipo_alloggio_id) VALUES ?`;
                    const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [slug, tipoId]); // Usa lo slug anziché immobileId

                    connection.query(tipiAlloggioSql, [valoriTipiAlloggio], (err) => {
                        if (err && !isResponseSent) {
                            isResponseSent = true;
                            return res.status(500).json({ status: "fail", message: "Errore durante l'inserimento dei tipi di alloggio", error: err });
                        }

                        if (!isResponseSent) {
                            isResponseSent = true;
                            return res.status(201).json({
                                status: "success",
                                immobile_slug: slug,
                                immobile: immobile
                            });
                        }
                    });
                });

            }
        );
    });
};



const modify = (req, res) => {
    const { slug } = req.params;
    const { immobile, tipi_alloggio, immagini } = req.body;

    if (!slug) {
        return res.status(400).json({ status: "fail", message: "Slug dell'immobile mancante" });
    }

    if (!immobile || Object.keys(immobile).length === 0) {
        return res.status(400).json({ status: "fail", message: "Nessun dato fornito per l'aggiornamento" });
    }

    const sqlSelect = `SELECT * FROM immobili WHERE slug = ?`;

    connection.query(sqlSelect, [slug], (err, result) => {
        if (err) return res.status(500).json({ status: "fail", message: "Errore nel recupero dell'immobile", error: err });

        if (result.length === 0) {
            return res.status(404).json({ status: "fail", message: `Nessun immobile con slug ${slug} trovato` });
        }

        const immobileData = result[0];

        // Validazione dei campi testuali
        const { titolo_descrittivo, indirizzo_completo, descrizione } = immobile;
        const textFields = { titolo_descrittivo, indirizzo_completo, descrizione };
        for (const [key, value] of Object.entries(textFields)) {
            if (value && (typeof value !== "string" || value.trim().length < 3)) {
                return res.status(400).json({ status: "fail", message: `Il campo ${key} deve contenere almeno 3 caratteri.` });
            }
        }

        // Validazione campi numerici
        const { mq, bagni, locali, posti_letto } = immobile;
        const numberFields = { mq, bagni, locali, posti_letto };
        for (const [key, value] of Object.entries(numberFields)) {
            if (value !== undefined && (typeof value !== "number" || value < 0)) {
                return res.status(400).json({ status: "fail", message: `Il campo ${key} deve essere un numero positivo.` });
            }
        }

        // Gestione dello slug se il titolo cambia
        let newSlug = immobileData.slug;
        if (titolo_descrittivo && (titolo_descrittivo !== immobileData.titolo_descrittivo)) {
            newSlug = slugify(titolo_descrittivo, { lower: true, strict: true });

            const checkSlugSql = `SELECT COUNT(*) AS count FROM immobili WHERE slug = ? AND slug != ?`;
            connection.query(checkSlugSql, [newSlug, immobileData.slug], (err, slugResult) => {
                if (err) return res.status(500).json({ status: "error", message: "Errore nel controllo dello slug", error: err });

                if (slugResult[0].count > 0) {
                    newSlug += `-${Date.now()}`;
                }

                // 🔹 Aggiorna le tabelle collegate prima di modificare lo slug
                const disableForeignKeys = `SET FOREIGN_KEY_CHECKS = 0`;
                const enableForeignKeys = `SET FOREIGN_KEY_CHECKS = 1`;

                connection.query(disableForeignKeys, (err) => {
                    if (err) return res.status(500).json({ status: "error", message: "Errore nella disabilitazione delle chiavi esterne", error: err });

                    // ✅ Aggiorna i riferimenti nelle tabelle collegate
                    const updateTypesQuery = `UPDATE immobili_tipi_alloggio SET slug_immobile = ? WHERE slug_immobile = ?`;
                    connection.query(updateTypesQuery, [newSlug, slug], (err) => {
                        if (err) return res.status(500).json({ status: "error", message: "Errore nell'aggiornamento dei tipi di alloggio", error: err });

                        const updateImagesQuery = `UPDATE immagini SET slug_immobile = ? WHERE slug_immobile = ?`;
                        connection.query(updateImagesQuery, [newSlug, slug], (err) => {
                            if (err) return res.status(500).json({ status: "error", message: "Errore nell'aggiornamento delle immagini", error: err });

                            // ✅ Ora possiamo aggiornare la tabella immobili
                            const updateImmobileSlugQuery = `UPDATE immobili SET slug = ? WHERE slug = ?`;
                            connection.query(updateImmobileSlugQuery, [newSlug, slug], (err) => {
                                if (err) return res.status(500).json({ status: "error", message: "Errore nell'aggiornamento dello slug dell'immobile", error: err });

                                // ✅ Riattiva i vincoli di chiave esterna
                                connection.query(enableForeignKeys, (err) => {
                                    if (err) return res.status(500).json({ status: "error", message: "Errore nella riattivazione delle chiavi esterne", error: err });

                                    return res.status(200).json({
                                        status: "success",
                                        message: "Immobile e riferimenti aggiornati con successo"
                                    });
                                });
                            });
                        });
                    });
                });

            });
        } else {
            eseguireUpdate(slug);
        }


        function eseguireUpdate(slug) {
            let sqlUpdate = `UPDATE immobili SET `;
            const fields = Object.keys(immobile).filter(field => immobile[field] !== undefined);
            const values = fields.map(field => immobile[field]);

            sqlUpdate += fields.map(field => `${field} = ?`).join(", ");
            sqlUpdate += ` WHERE slug = ?`;
            values.push(slug);

            connection.query(sqlUpdate, values, (err) => {
                if (err) return res.status(500).json({ status: "fail", message: "Errore nell'aggiornamento dell'immobile", error: err });

                // ✅ Aggiornamento delle immagini nella tabella corretta
                if (Array.isArray(immagini) && immagini.length > 0) {
                    const sqlDeleteImages = `DELETE FROM immagini WHERE slug_immobile = ?`;
                    connection.query(sqlDeleteImages, [slug], (err) => {
                        if (err) return res.status(500).json({ status: "error", message: "Errore nella rimozione delle immagini", error: err });

                        const sqlInsertImages = `INSERT INTO immagini (nome_immagine, slug_immobile) VALUES ?`;
                        const imageValues = immagini.map(nomeImmagine => [nomeImmagine, slug]);

                        connection.query(sqlInsertImages, [imageValues], (err) => {
                            if (err) return res.status(500).json({ status: "error", message: "Errore nell'inserimento delle immagini", error: err });

                            // ✅ Aggiorna i tipi di alloggio
                            if (Array.isArray(tipi_alloggio) && tipi_alloggio.length > 0) {
                                const sqlDeleteTipiAlloggio = `DELETE FROM Immobili_Tipi_Alloggio WHERE immobile_slug = ?`;

                                connection.query(sqlDeleteTipiAlloggio, [slug], (err) => {
                                    if (err) return res.status(500).json({ status: "error", message: "Errore nella rimozione dei tipi di alloggio", error: err });

                                    const sqlInsertTipiAlloggio = `INSERT INTO Immobili_Tipi_Alloggio (immobile_slug, tipo_alloggio_id) VALUES ?`;
                                    const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [slug, tipoId]);

                                    connection.query(sqlInsertTipiAlloggio, [valoriTipiAlloggio], (err) => {
                                        if (err) return res.status(500).json({ status: "error", message: "Errore nell'inserimento dei tipi di alloggio", error: err });

                                        return res.status(200).json({
                                            status: "success",
                                            message: "Immobile aggiornato con successo, tipi_alloggio e immagini aggiornati"
                                        });
                                    });
                                });
                            } else {
                                return res.status(200).json({
                                    status: "success",
                                    message: "Immobile aggiornato con successo e immagini aggiornate"
                                });
                            }
                        });
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Immobile aggiornato con successo senza immagini"
                    });
                }
            });
        }
    });
};


export default { index, show, destroy, store, modify };
