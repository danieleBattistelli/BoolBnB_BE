import connection from "../data/db.js";


const index = (req, res, next) => {

    const sql = `SELECT immobili.*,  CAST(AVG(recensioni.voto) AS FLOAT) AS voto_medio
    FROM immobili
    INNER JOIN recensioni
    ON recensioni.id_immobile = immobili.id
    GROUP BY recensioni.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err });
        }
        else if (results.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "nessun immobile trovato",
            });
        }

        return res.status(200).json({
            status: "success",
            results: results,
        })
    })

};

const show = (req, res, next) => {

    let sql = `SELECT *
    FROM immobili
    WHERE immobili.id = ?`;

    const id = req.params.id;

    connection.query(sql, [id], (err, immobile) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err });
        }
        else if (immobile.length === 0) {
            return res.status(404).json({
                status: "error",
                message: `immobile con id ${id} non trovato.`,
            });
        }

        let sqlRecensioni = `SELECT recensioni.*
        FROM immobili
        INNER JOIN recensioni
        ON recensioni.id_immobile = immobili.id
        WHERE immobili.id = ?`;

        connection.query(sqlRecensioni, id, (err, recensioni) => {
            if (err) {
                return res.status(500).json({ status: "error", message: err });
            }
            else if (recensioni.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: `recensioni per immobile con id ${id} non trovato.`,
                });
            }


            return res.status(200).json({
                status: "success",
                results: {
                    ...immobile[0],
                    recensioni,
                },
            });

        })



    })
};

export default { index, show };