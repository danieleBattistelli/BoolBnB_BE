const mysql= require("mysql2")

const connection= mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env,
    password: DB_USER,
    database: DB
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Connected to boolbnb_db")
});

module.exports = connection;