import connection from "../data/db.js";

const index = (req, res) => {
    const sqlImmobiliTipoAlloggio = `SELECT * FROM tipi_alloggio;`;

    connection.query(sqlImmobiliTipoAlloggio, (err, alloggi) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                error: err

            })
        }

        return res.status(200).json({
            status: "success",
            results: alloggi,
        });

    });
};

export default {index};