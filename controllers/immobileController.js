import connection from "../data/db.js";
import slugify from "slugify";

const index = (req, res) => {
    const sqlImmobili = `SELECT * FROM immobili WHERE data_eliminazione IS NULL;`;

    connection.query(sqlImmobili, (err, immobili) => {
        if (err) return res.status(500).json({ status: "fail", message: err });

        if (immobili.length === 0) {
            return res.status(404).json({ status: "fail", message: "Nessun immobile trovato" });
        }

        const sqlVotiMedi = `
            SELECT id_immobile, CAST(AVG(voto) AS FLOAT) AS voto_medio
            FROM recensioni
            GROUP BY id_immobile;
        `;

        connection.query(sqlVotiMedi, (err, voti) => {
            if (err) return res.status(500).json({ status: "fail", message: err });

            const votoMap = {};
            voti.forEach(({ id_immobile, voto_medio }) => {
                votoMap[id_immobile] = voto_medio;
            });

            const immobiliFinali = immobili.map(immobile => ({
                ...immobile,
                voto_medio: votoMap[immobile.id] || null
            }));

            return res.status(200).json({
                status: "success",
                results: immobiliFinali,
            });
        });
    });
};

const show = (req, res) => {
    const slug = req.params.slug;

    const sqlImmobile = `SELECT * FROM immobili WHERE slug = ?`;

    connection.query(sqlImmobile, [slug], (err, immobili) => {
        if (err) return res.status(500).json({ status: "fail", message: err });

        if (immobili.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `Immobile con slug '${slug}' non trovato.`,
            });
        }

        const immobile = immobili[0];

        if (immobile.data_eliminazione) {
            return res.status(404).json({
                status: "fail",
                message: `L'immobile con slug '${slug}' è stato eliminato e non è più disponibile.`,
            });
        }

        return res.status(200).json({
            status: "success",
            immobile: immobile
        });
    });
};

const destroy = (req, res) => {
    const slug = req.params.slug;

    const checkSql = `SELECT data_eliminazione FROM immobili WHERE slug = ?`;

    connection.query(checkSql, [slug], (err, results) => {
        if (err) return res.status(500).json({ status: "error", message: err });

        if (results.length === 0) {
            return res.status(404).json({
                status: "error",
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
            if (err) return res.status(500).json({ status: "error", message: err });

            return res.sendStatus(204);
        });
    });
};

const store = (req, res) => {
    const { immobile, tipi_alloggio } = req.body;

    if (!immobile) {
        return res.status(400).json({ status: "error", message: "Dati immobile mancanti" });
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
                return res.status(400).json({ status: "error", message: `Il campo ${key} deve contenere almeno 3 caratteri.` });
            }
        }
    }

    // Validazione email
    if (!email_proprietario || typeof email_proprietario !== "string" || email_proprietario.length < 5 || !email_proprietario.includes("@")) {
        if (!isResponseSent) {
            isResponseSent = true;
            return res.status(400).json({ status: "error", message: "L'email deve avere almeno 5 caratteri e un formato valido." });
        }
    }

    // Validazione username
    if (!username_proprietario || typeof username_proprietario !== "string" || username_proprietario.trim().length < 2) {
        if (!isResponseSent) {
            isResponseSent = true;
            return res.status(400).json({ status: "error", message: "Lo username deve avere almeno 2 caratteri." });
        }
    }

    // Validazione dei campi numerici
    const numberFields = { mq, bagni, locali, posti_letto };
    for (const [key, value] of Object.entries(numberFields)) {
        if (typeof value !== "number" || value < 0) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(400).json({ status: "error", message: `Il campo ${key} deve essere un numero positivo.` });
            }
        }
    }

    let slug = slugify(titolo_descrittivo, { lower: true, strict: true });

    const checkSlugSql = `SELECT COUNT(*) AS count FROM immobili WHERE slug = ?`;

    connection.query(checkSlugSql, [slug], (err, result) => {
        if (err) {
            if (!isResponseSent) {
                isResponseSent = true;
                return res.status(500).json({ status: "error", message: "Errore nel controllo dello slug", error: err });
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
                        return res.status(500).json({ status: "error", message: "Errore durante l'inserimento dell'immobile", error: err });
                    }
                }

                const immobileId = result.insertId;

                console.log(immobileId);

                // Inserimento immagini
                const checkTipoAlloggioExistenceSql = `SELECT id FROM tipi_alloggio WHERE id IN (?)`;

                connection.query(checkTipoAlloggioExistenceSql, [tipi_alloggio], (err, result) => {
                    if (err) {
                        if (!isResponseSent) {
                            isResponseSent = true;
                            return res.status(500).json({ status: "error", message: "Errore nella verifica dei tipi di alloggio", error: err });
                        }
                    }

                    const validIds = result.map(row => row.id);
                    const invalidIds = tipi_alloggio.filter(id => !validIds.includes(id));

                    if (invalidIds.length > 0) {
                        if (!isResponseSent) {
                            isResponseSent = true;
                            return res.status(400).json({ status: "error", message: `I seguenti tipi di alloggio non esistono: ${invalidIds.join(', ')}` });
                        }
                    }

                    // Se tutti gli ID sono validi, prosegui con l'inserimento
                    const tipiAlloggioSql = `INSERT INTO Immobili_Tipi_Alloggio (immobile_id, tipo_alloggio_id) VALUES ?`;
                    const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [immobileId, tipoId]);

                    connection.query(tipiAlloggioSql, [valoriTipiAlloggio], (err) => {
                        if (err && !isResponseSent) {
                            isResponseSent = true;
                            return res.status(500).json({ status: "error", message: "Errore durante l'inserimento dei tipi di alloggio", error: err });
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
    const { id } = req.params;
    const { immobile, tipi_alloggio } = req.body;

    if (!id) {
        return res.status(400).json({ status: "fail", message: "ID dell'immobile mancante" });
    }

    if (!immobile || Object.keys(immobile).length === 0) {
        return res.status(400).json({ status: "fail", message: "Nessun dato fornito per l'aggiornamento" });
    }

    const sqlSelect = `SELECT * FROM immobili WHERE id = ?`;

    connection.query(sqlSelect, [id], (err, result) => {
        if (err) return res.status(500).json({ status: "fail", message: "Errore nel recupero dell'immobile", error: err });

        if (result.length === 0) {
            return res.status(404).json({ status: "fail", message: `Nessun immobile con ID ${id} trovato` });
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
        let slug = immobileData.slug;
        if (titolo_descrittivo && titolo_descrittivo !== immobileData.titolo_descrittivo) {
            slug = slugify(titolo_descrittivo, { lower: true, strict: true });

            const checkSlugSql = `SELECT COUNT(*) AS count FROM immobili WHERE slug = ? AND id != ?`;
            connection.query(checkSlugSql, [slug, id], (err, slugResult) => {
                if (err) return res.status(500).json({ status: "error", message: "Errore nel controllo dello slug", error: err });

                if (slugResult[0].count > 0) {
                    slug += `-${Date.now()}`;
                }

                immobile.slug = slug; // Associa lo slug aggiornato
                eseguireUpdate();
            });
        } else {
            eseguireUpdate();
        }

        // Funzione per eseguire l'aggiornamento
        function eseguireUpdate() {
            let sqlUpdate = `UPDATE immobili SET `;
            const fields = Object.keys(immobile).filter(field => immobile[field] !== undefined);
            const values = fields.map(field => immobile[field]);

            sqlUpdate += fields.map(field => `${field} = ?`).join(", ");
            sqlUpdate += ` WHERE id = ?`;
            values.push(id);

            connection.query(sqlUpdate, values, (err) => {
                if (err) return res.status(500).json({ status: "fail", message: "Errore nell'aggiornamento dell'immobile", error: err });

                // Aggiorna tipi di alloggio
                if (Array.isArray(tipi_alloggio) && tipi_alloggio.length > 0) {
                    const sqlDeleteTipiAlloggio = `DELETE FROM Immobili_Tipi_Alloggio WHERE immobile_id = ?`;

                    connection.query(sqlDeleteTipiAlloggio, [id], (err) => {
                        if (err) return res.status(500).json({ status: "error", message: "Errore nella rimozione dei tipi di alloggio", error: err });

                        const sqlInsertTipiAlloggio = `INSERT INTO Immobili_Tipi_Alloggio (immobile_id, tipo_alloggio_id) VALUES ?`;
                        const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [id, tipoId]);

                        connection.query(sqlInsertTipiAlloggio, [valoriTipiAlloggio], (err) => {
                            if (err) return res.status(500).json({ status: "error", message: "Errore nell'inserimento dei tipi di alloggio", error: err });

                            return res.status(200).json({
                                status: "success",
                                message: "Immobile aggiornato con successo e tipi_alloggio aggiornati"
                            });
                        });
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "Immobile aggiornato con successo"
                    });
                }
            });
        }
    });
};


export default { index, show, destroy, store, modify };
