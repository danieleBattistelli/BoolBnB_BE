import connection from "../data/db.js";


const index = (req, res, next) => {
    return res.status(200).json({
        status: "success",
        message: "Sono una lista di immobili!",
    });
};

export default { index };