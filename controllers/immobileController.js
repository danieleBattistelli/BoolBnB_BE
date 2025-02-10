import { response } from "express";
import connection from "../data/db.js";


const index = (req, res) => {
    // Query per ottenere tutti gli immobili (inclusi quelli senza recensioni)
    const sqlImmobili = `
        SELECT * FROM immobili
        WHERE data_eliminazione IS NULL;
    `;

    connection.query(sqlImmobili, (err, immobili) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }

        if (immobili.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Nessun immobile trovato",
            });
        }

        // Query per ottenere la media dei voti per gli immobili con recensioni
        const sqlVotiMedi = `
            SELECT id_immobile, CAST(AVG(voto) AS FLOAT) AS voto_medio
            FROM recensioni
            GROUP BY id_immobile;
        `;

        connection.query(sqlVotiMedi, (err, voti) => {
            if (err) {
                return res.status(500).json({ status: "fail", message: err });
            }

            // Mappiamo i voti medi con gli immobili
            const votoMap = {};
            voti.forEach(({ id_immobile, voto_medio }) => {
                votoMap[id_immobile] = voto_medio;
            });

            // Aggiungiamo il voto medio solo agli immobili con recensioni
            const immobiliFinali = immobili.map(immobile => ({
                ...immobile,
                voto_medio: votoMap[immobile.id] || null // Se non ha recensioni, voto_medio è NULL
            }));

            return res.status(200).json({
                status: "success",
                results: immobiliFinali,
            });
        });
    });
};


const show = (req, res) => {

    let sql = `SELECT *
    FROM immobili
    WHERE immobili.id = ?`;

    const id = req.params.id;

    connection.query(sql, [id], (err, immobile) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }
        else if (immobile.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `immobile con id ${id} non trovato.`,
            });
        }

        let sqlRecensioni = `SELECT recensioni.id, utenti.nome, utenti.cognome, recensioni.recensione, recensioni.voto, recensioni.data
        FROM immobili
        INNER JOIN recensioni
        ON recensioni.id_immobile = immobili.id
        INNER JOIN utenti
        ON recensioni.id_utente = utenti.id
        WHERE immobili.id = ?`;


        connection.query(sqlRecensioni, id, (err, recensioni) => {

            if (err) {
                return res.status(500).json({ status: "fail", message: err });
            }

            else if (recensioni.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    message: `recensioni per immobile con id ${id} non trovato.`,
                });
            }

            if (immobile[0].data_eliminazione) {
                return res.status(404).json({
                    status: "fail",
                    message: `l\'immobile con id ${id} è stato eliminato e non è più disponibile.`
                });

            }

            else {

                return res.status(200).json({
                    status: "success",
                    results: {
                        ...immobile[0],
                        recensioni,
                    },
                });

            }

        })


    })
};

const destroy = (req, res) => {

    const id = req.params.id;


    const checkSql = `SELECT immobili.data_eliminazione 
        FROM immobili 
        WHERE immobili.id = ?`

    connection.query(checkSql, [id], (err, dataEliminazione) => {

        if (dataEliminazione[0].data_eliminazione) {
            return res.status(200).json({
                message: "l'immobile è già stato eliminato",
                dataEliminazione: dataEliminazione[0].data_eliminazione
            });
        }

        else {

            const sql = `UPDATE Immobili i
            JOIN Recensioni r ON i.id = r.id_immobile
            SET i.data_eliminazione = CURDATE(), 
            r.data_eliminazione = CURDATE()
            WHERE i.id = ?
            `;

            connection.query(sql, [id], (err, response) => {

                if (err) {
                    return res.status(500).json({ status: "error", message: err });
                }

                else if (response.length === 0) {
                    return res.status(404).json({
                        status: "error",
                        message: `nessun immobile con id ${id} trovato.`,
                    });
                }

                res.sendStatus(204);
            });

        }

    })

}

const store = (req, res) => {
    const { immobile, servizi, tipi_alloggio } = req.body;

    const { id_utente_proprietario, prezzo_affitto, titolo_descrittivo, indirizzo, citta, descrizione, imgs, mq, bagni, locali, posti_letto } = immobile;

    const sqlInsertImmobile = `
        INSERT INTO Immobili (
            id_utente_proprietario, 
            prezzo_affitto, 
            titolo_descrittivo, 
            indirizzo, 
            citta, 
            descrizione, 
            imgs, 
            mq, 
            bagni, 
            locali, 
            posti_letto, 
            data_eliminazione
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);
    `;

    // Inserimento dell'immobile
    connection.query(sqlInsertImmobile, [id_utente_proprietario, prezzo_affitto, titolo_descrittivo, indirizzo, citta, descrizione, imgs, mq, bagni, locali, posti_letto], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Errore durante l'inserimento dell'immobile", error: err });
        }

        const immobileId = result.insertId;

        if (servizi && servizi.length > 0) {
            const serviziSql = `
                INSERT INTO Immobili_Servizi (id_immobile, id_servizio) VALUES ?
            `;

            const valoriServizi = servizi.map(servizioId => [immobileId, servizioId]);

            // Inserimento dei servizi
            connection.query(serviziSql, [valoriServizi], (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "Errore durante l'inserimento dei servizi", error: err });
                }

                if (tipi_alloggio && tipi_alloggio.length > 0) {
                    const tipiAlloggioSql = `
                        INSERT INTO Immobili_Tipi_Alloggio (id_immobile, id_tipo_alloggio) VALUES ?
                    `;

                    const valoriTipiAlloggio = tipi_alloggio.map(tipoId => [immobileId, tipoId]);

                    // Inserimento dei tipi di alloggio
                    connection.query(tipiAlloggioSql, [valoriTipiAlloggio], (err) => {
                        if (err) {
                            return res.status(500).json({ status: "error", message: "Errore durante l'inserimento dei tipi di alloggio", error: err });
                        }

                        return res.status(200).json({
                            status: "success",
                            immobile_id: immobileId,
                            immobile: immobile
                        });
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        immobile_id: immobileId,
                        immobile: immobile
                    });
                }
            });
        } else {
            return res.status(200).json({
                status: "success",
                immobile_id: immobileId,
                immobile: immobile
            });
        }
    });
};


const modify = (req, res) => {
    const { id } = req.params;
    const { immobile } = req.body;

    // Controlla se l'ID è fornito
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "ID dell'immobile mancante"
        });
    }

    // Controlla se il body contiene almeno un campo aggiornabile
    if (!immobile || Object.keys(immobile).length === 0) {
        return res.status(400).json({
            status: "fail",
            message: "Nessun dato fornito per l'aggiornamento"
        });
    }

    const sqlSelect = `
        SELECT * 
        FROM immobili
        WHERE id = ?
    `;

    connection.query(sqlSelect, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }

        if (result.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `Nessun immobile con id ${id} trovato`
            });
        }

        let sqlUpdate = `UPDATE immobili SET `;
        const fields = Object.keys(immobile);
        const values = fields.map(field => immobile[field]);

        sqlUpdate += fields.map(field => `${field} = ?`).join(", ");
        sqlUpdate += ` WHERE id = ?`;
        values.push(id); 

        connection.query(sqlUpdate, values, (err, response) => {
            if (err) {
                return res.status(500).json({ status: "fail", message: err });
            }

            return res.status(200).json({
                status: "success",
                message: "Immobile aggiornato con successo"
            });
        });
    });
};


export default { index, show, destroy, store, modify };