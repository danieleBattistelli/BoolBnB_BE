import { query } from "express";
import connection from "../data/db.js";
import slugify from "slugify";

const index = (req, res) => {
    let sqlImmobili = `
    SELECT 
        i.id, 
        i.slug, 
        i.email_proprietario, 
        i.username_proprietario, 
        i.titolo_descrittivo, 
        i.indirizzo_completo, 
        i.descrizione, 
        i.mq, 
        i.bagni, 
        i.locali, 
        i.posti_letto, 
        i.data_eliminazione, 
        COALESCE(v.voto_medio, 0) AS voto_medio, 
        COALESCE(v.tot_recensioni, 0) AS tot_recensioni,
        COALESCE(GROUP_CONCAT(DISTINCT t.nome_tipo_alloggio SEPARATOR ', '), '') AS tipi_alloggio
    FROM immobili i
    LEFT JOIN (
        SELECT 
            id_immobile, 
            CAST(AVG(voto) AS FLOAT) AS voto_medio, 
            COUNT(recensioni.id) AS tot_recensioni
        FROM recensioni 
        GROUP BY id_immobile
    ) v ON i.id = v.id_immobile
    LEFT JOIN immobili_tipi_alloggio it ON i.slug = it.slug_immobile
    LEFT JOIN tipi_alloggio t ON it.tipo_alloggio_id = t.id
    WHERE i.data_eliminazione IS NULL
    `;

    const params = [];

    // Gestione del parametro 'search' per indirizzo_completo
    const search = req.query.search;
    if (search) {
        sqlImmobili += " AND i.indirizzo_completo LIKE ?";
        params.push(`%${search}%`);
    }

    // Gestione dinamica di altri parametri di filtro
    const allowedFilters = ["locali", "bagni", "superficie_min", "superficie_max", "tipi_alloggio", "voto_medio" ];

    Object.keys(req.query).forEach((key) => {
        if (allowedFilters.includes(key)) {
            switch (key) {
                case "superficie_min":
                    sqlImmobili += " AND i.superficie >= ?";
                    params.push(req.query[key]);
                    break;
                case "superficie_max":
                    sqlImmobili += " AND i.superficie <= ?";
                    params.push(req.query[key]);
                    break;
                case "tipi_alloggio":
                    sqlImmobili += " AND t.id = ?";
                    params.push(req.query[key]);
                    break;
                case "bagni":
                    sqlImmobili += " AND i.bagni >= ?";
                    params.push(req.query[key]); // Impostiamo il valore di `bagni` passato nella query
                    break;

                case "voto_medio":
                    console.log(key);
                    sqlImmobili += " AND COALESCE(v.voto_medio, 0) >= ?";
                    params.push(req.query[key]);
                    break;    
                default:
                    sqlImmobili += ` AND i.${key} >= ?`;
                    params.push(req.query[key]);
                    break;
            }
        }
    });

    // Gestione ordinamento per voto medio
    const orderByVoto = req.query.order_by_voto;
    if (orderByVoto === "asc") {
        sqlImmobili += " ORDER BY voto_medio ASC";
    } else if (orderByVoto === "desc") {
        sqlImmobili += " ORDER BY voto_medio DESC";
    }

    // Aggiungi GROUP BY per tutte le colonne che non sono aggregate
    sqlImmobili += `
    GROUP BY 
        i.id, 
        i.slug, 
        i.email_proprietario, 
        i.username_proprietario, 
        i.titolo_descrittivo, 
        i.indirizzo_completo, 
        i.descrizione, 
        i.mq, 
        i.bagni, 
        i.locali, 
        i.posti_letto, 
        i.data_eliminazione
    `;

    // Esegui la query
    connection.query(sqlImmobili, params, (err, immobili) => {
        if (err) return res.status(500).json({ status: "fail", message: err });

        if (immobili.length === 0) {
            return res.status(404).json({ status: "fail", message: "Nessun immobile trovato" });
        }

        // Ottenere gli slug degli immobili
        const slugs = immobili.map(immobile => immobile.slug);

        if (slugs.length === 0) {
            return res.status(200).json({
                status: "success",
                results: immobili.map(immobile => ({
                    ...immobile,
                    immagini: [],
                    tipi_alloggio: []
                })),
            });
        }

        // Ottenere immagini per gli immobili
        const sqlImmagini = `
            SELECT slug_immobile, id, nome_immagine
            FROM immagini
            WHERE slug_immobile IN (?);
        `;

        connection.query(sqlImmagini, [slugs], (err, immagini) => {
            if (err) return res.status(500).json({ status: "fail", message: err });

            // Raggruppare le immagini per slug_immobile
            const immaginiMap = {};
            immagini.forEach(({ slug_immobile, id, nome_immagine }) => {
                if (!immaginiMap[slug_immobile]) {
                    immaginiMap[slug_immobile] = [];
                }
                immaginiMap[slug_immobile].push({ id, nome_immagine });
            });

            // Ottenere tipi di alloggio per gli immobili
            const sqlTipiAlloggio = `
                SELECT ia.slug_immobile, ta.id, ta.nome_tipo_alloggio
                FROM immobili_tipi_alloggio ia
                INNER JOIN tipi_alloggio ta ON ia.tipo_alloggio_id = ta.id
                WHERE ia.slug_immobile IN (?);
            `;

            connection.query(sqlTipiAlloggio, [slugs], (err, tipiAlloggio) => {
                if (err) return res.status(500).json({ status: "fail", message: err });

                // Raggruppare i tipi di alloggio per slug_immobile
                const tipiAlloggioMap = {};
                tipiAlloggio.forEach(({ slug_immobile, id, nome_tipo_alloggio }) => {
                    if (!tipiAlloggioMap[slug_immobile]) {
                        tipiAlloggioMap[slug_immobile] = [];
                    }
                    tipiAlloggioMap[slug_immobile].push({ id, nome_tipo_alloggio });
                });

                // Associare le immagini e i tipi di alloggio agli immobili
                const immobiliFinali = immobili.map(immobile => ({
                    ...immobile,
                    immagini: immaginiMap[immobile.slug] || [],
                    tipi_alloggio: tipiAlloggioMap[immobile.slug] || []
                }));

                return res.status(200).json({
                    status: "success",
                    immobili: immobiliFinali,
                    count: immobiliFinali.length
                });
            });
        });
    });
};

const show = (req, res, next) => {
    const slug = req.params.slug;

    // Primo step: ottenere l'id dell'immobile
    const sqlId = `SELECT id FROM immobili WHERE slug = ?`;

    connection.query(sqlId, [slug], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }

        // Se nessun immobile è stato trovato
        if (!result.length) {
            return res.status(404).json({ status: "fail", message: "Nessun immobile trovato" });
        }

        const idImmobile = result[0].id;

        // Secondo step: ottenere i dettagli dell'immobile
        const sqlImmobile = `SELECT * FROM immobili WHERE slug = ?`;

        connection.query(sqlImmobile, [slug], (err, immobile) => {
            if (err) {
                return res.status(500).json({ status: "fail", message: err });
            }

            if (immobile.length === 0) {
                return res.status(404).json({ status: "fail", message: `Immobile con slug ${slug} non trovato.` });
            }

            // Terzo step: ottenere le recensioni
            const sqlRecensioni = `
                SELECT id, username, recensione, voto, data
                FROM recensioni
                WHERE id_immobile = ?
            `;

            connection.query(sqlRecensioni, [idImmobile], (err, recensioni) => {
                if (err) {
                    return res.status(500).json({ status: "fail", message: err });
                }

                // Quarto step: ottenere le immagini
                const sqlImmagini = `
                    SELECT id, nome_immagine
                    FROM immagini
                    WHERE slug_immobile = ?
                `;

                connection.query(sqlImmagini, [slug], (err, immagini) => {
                    if (err) {
                        return res.status(500).json({ status: "fail", message: err });
                    }

                    // Quinto step: ottenere i tipi di alloggio
                    const sqlTipiAlloggi = `
                        SELECT ta.id, ta.nome_tipo_alloggio
                        FROM tipi_alloggio ta
                        INNER JOIN immobili_tipi_alloggio ita ON ta.id = ita.tipo_alloggio_id
                        WHERE ita.slug_immobile = ? 
                    `;

                    connection.query(sqlTipiAlloggi, [slug], (err, tipiAlloggio) => {
                        if (err) {
                            return res.status(500).json({ status: "fail", message: err });
                        }

                        function calcolaMedia(array) {
                            if (array.length === 0) return 0;

                            const numeri = array.map(item => {
                                const numero = parseInt(item, 10);
                                return isNaN(numero) ? 0 : numero;
                            });

                            return numeri.reduce((a, b) => a + b, 0) / numeri.length;
                        }


                        const voti = [];

                        recensioni.forEach((recensione) => voti.push(recensione.voto));

                        // Invio della risposta finale con tutti i dati raccolti
                        return res.status(200).json({
                            status: "success",
                            results: {
                                immobile: {
                                    ...immobile[0],
                                    tot_recensioni: recensioni.length,
                                    voto_medio: calcolaMedia(voti),
                                    recensioni: recensioni || [],
                                },
                                immagini: immagini || [],
                                tipi_alloggio: tipiAlloggio || []
                            }
                        });
                    });
                });
            });
        });
    });
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
    const { immobile, tipi_alloggio = [] } = req.body;
    const nomiImmagini = req.files ? req.files.map(file => file.filename) : [];

    console.log("Files ricevuti:", req.files);
    console.log("Body ricevuto:", req.body);

    if (
        !immobile ||
        !(
            immobile.username_proprietario &&
            immobile.email_proprietario &&
            immobile.titolo_descrittivo &&
            immobile.indirizzo_completo &&
            immobile.descrizione &&
            immobile.mq &&
            immobile.bagni &&
            immobile.locali &&
            immobile.posti_letto
        )
    ) {
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
    } = immobile;

    let slug = slugify(titolo_descrittivo, { lower: true, strict: true });

    const checkSlugSql = `SELECT COUNT(*) AS count FROM immobili WHERE slug = ?`;
    connection.query(checkSlugSql, [slug], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: "Errore nel controllo dello slug", error: err });
        }

        if (result[0].count > 0) {
            slug += `-${Date.now()}`;
        }

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
            let numValue = parseInt(value);

            // Se il valore non è un numero valido dopo la conversione
            if (isNaN(numValue)) {
                return res.status(400).json({
                    status: "fail",
                    message: `Il campo 'numero ${key}' deve essere un numero valido.`
                });
            }

            // Assegna il numero convertito al campo originale
            numberFields[key] = numValue;

            // Controlla se il valore è minore di 0 o maggiore di 10 (eccetto per "mq")
            if (numValue < 0 || (key !== "mq" && numValue > 10)) {
                return res.status(400).json({
                    status: "fail",
                    message: `Il campo 'numero ${key}' deve essere un numero positivo e non può essere maggiore di 10.`
                });
            }
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
            (err) => {
                if (err) {
                    return res.status(500).json({ status: "fail", message: "Errore durante l'inserimento dell'immobile", error: err });
                }

                let messaggio = "Immobile creato con successo.";

                const inserisciTipiAlloggio = () => {
                    if (tipi_alloggio.length > 0) {
                        const tipiAlloggioSql = `INSERT INTO immobili_tipi_alloggio (slug_immobile, tipo_alloggio_id) VALUES ?`;
                        const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [slug, tipoId]);

                        connection.query(tipiAlloggioSql, [valoriTipiAlloggio], (err) => {
                            if (err) {
                                return res.status(500).json({ status: "fail", message: "Errore durante l'inserimento dei tipi di alloggio", error: err });
                            }

                            if (nomiImmagini.length === 0) {
                                return res.status(201).json({
                                    status: "success",
                                    immobile_slug: slug,
                                    immobile: immobile,
                                    message: `${messaggio} Nessuna immagine caricata.`,
                                });
                            } else {
                                inserisciImmagini();
                            }
                        });
                    } else {
                        messaggio += " Nessun tipo di alloggio specificato.";

                        if (nomiImmagini.length === 0) {
                            return res.status(201).json({
                                status: "success",
                                immobile_slug: slug,
                                immobile: immobile,
                                message: `${messaggio} Nessuna immagine caricata.`,
                            });
                        } else {
                            inserisciImmagini();
                        }
                    }
                };

                const inserisciImmagini = () => {
                    const sqlInsertImmagini = `INSERT INTO immagini (nome_immagine, slug_immobile) VALUES ?`;
                    const valoriImmagini = nomiImmagini.map(nome => [nome, slug]);

                    connection.query(sqlInsertImmagini, [valoriImmagini], (err) => {
                        if (err) {
                            return res.status(500).json({ status: "fail", message: "Errore durante l'inserimento delle immagini", error: err });
                        }

                        return res.status(201).json({
                            status: "success",
                            immobile_slug: slug,
                            immobile: immobile,
                            message: messaggio,
                        });
                    });
                };

                inserisciTipiAlloggio();
            }
        );
    });
};


const modify = (req, res) => {
    const { slug } = req.params;
    const { immobile, tipi_alloggio, immagini } = req.body;

    const nomiImmagini = req.files ? req.files.map(file => file.filename) : [];

    immagini.push(...nomiImmagini);

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
