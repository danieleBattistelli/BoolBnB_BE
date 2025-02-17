import { query } from "express";
import connection from "../data/db.js";

const store = (req, res) => {
    const { username, email, recensione, voto } = req.body;
    const idImmobile = req.params.id_immobile;

    console.log({ username, email, recensione, voto, idImmobile });

    const sqlStore = `
        INSERT INTO recensioni (id_immobile, username, email, recensione, voto, data)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    connection.query(sqlStore, [idImmobile, username, email, recensione, voto], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: err
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Recensione aggiunta con successo",
            recensione: {
                id: result.insertId,
                id_immobile: idImmobile,
                username,
                email,
                recensione,
                voto,
                data: new Date().toISOString()
            }
        });
    });
};

export default { store };
