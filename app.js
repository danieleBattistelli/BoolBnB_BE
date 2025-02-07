import express from "express";
import immobiliRouter from "./routers/immobili.js";
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


// middlewares di errore
app.use(notFoundPage.notFoundRoute);

app.use(handleError);
