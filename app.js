import express from "express";
import immobiliRouter from "./routers/immobili.js";
import alloggiRouter from "./routers/alloggi.js";
import recensioniRouter from "./routers/recensioni.js"
import notFoundPage from './middlewares/notFoundRoute.js';
import handleError from "./middlewares/handleError.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})

app.use(cors({
    origin: process.env.FRONTEND_URL,
}))

// impostazioni 
app.use(express.json());

app.use(express.static("public"));

// rotte
app.use("/immobili", immobiliRouter);
app.use("/tipi-alloggi", alloggiRouter);
app.use("/recensioni", recensioniRouter);

// middlewares di errore
app.use(notFoundPage.notFoundRoute);

app.use(handleError);
