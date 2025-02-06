import connection from "../data/db.js";

const index = (req, res, next) => {
    return res.status(200).json({
        status: "success",
        message: "Questa e' la Homepage",
    });
};

export default { index };