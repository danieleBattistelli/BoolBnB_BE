const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Questa è una web app che permette di cercare immobili in affitto ');
});
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})
