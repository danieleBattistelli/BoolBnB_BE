import connection from "../data/db.js";


const index = (req, res,) => {

    const sql = `SELECT immobili.*, CAST(AVG(recensioni.voto) AS FLOAT) AS voto_medio
    FROM immobili
    INNER JOIN recensioni
    ON recensioni.id_immobile = immobili.id
    GROUP BY immobili.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "fail", message: err });
        }

        else if (results.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "nessun immobile trovato",
            });
        }

        const immobiliPresenti = []

        results.forEach((immobile) => {
            if (!immobile.data_eliminazione) {

                immobiliPresenti.push(immobile);


            }

        })

        return res.status(200).json({
            status: "success",
            results: immobiliPresenti,
        })
    })

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

            if(immobile[0].data_eliminazione ){
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

}

const modify = (req, res) => {

}

export default { index, show, destroy, store, modify };