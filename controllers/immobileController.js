import connection from "../data/db.js";


const index = (req, res, next) => {

    const sql = `SELECT immobili.*, AVG(recensioni.voto) AS avg_voto
    FROM immobili
    INNER JOIN recensioni
    ON recensioni.id_immobile = immobili.id
    GROUP BY immobili.id AND avg_voto.
    `;
    return res.status(200).json({
        status: "success",
        message: "Sono una lista di immobili!",
    });
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