import express from "express";

const app = express();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Questa è una web app che permette di cercare immobili in affitto ');
});
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})
