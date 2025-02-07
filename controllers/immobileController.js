import connection from "../data/db.js";


const index = (req, res, next) => {

    const sql = `SELECT immobili.*,  CAST(AVG(recensioni.voto) AS FLOAT) AS voto_medio
    FROM immobili
    INNER JOIN recensioni
    ON recensioni.id_immobile = immobili.id
    GROUP BY recensioni.id
    `;

    connection.query(sql, (err, results) => {
        if(err) {
            return res.status(500).json({ status: "error", message: err});
        }
        else if (results.length === 0) {
            return res.status(404).json({
                status:"error",
                message: "nessun immobile trovato",
            });
        }

        return res.status(200).json({
            status:"success",
            results: results,
        })
    })
    
};

const show = (req, res, next) => {

    const sql = ``;
    const id = req.params.id;

    return res.status(200).json({
        status: "success",
        message: `Sono un immobile! con id: ${id}`,
    });
}

export default { index, show };