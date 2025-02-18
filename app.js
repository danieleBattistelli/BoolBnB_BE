import express from "express";
import immobiliRouter from "./routers/immobili.js";
import alloggiRouter from "./routers/alloggi.js";
import recensioniRouter from "./routers/recensioni.js"
import notFoundPage from './middlewares/notFoundRoute.js';
import handleError from "./middlewares/handleError.js";
import cors from "cors";
import dotenv from "dotenv";
import sendEmail from "./controllers/emailController.js";
import validateEmailInput from "./middlewares/validateEmailInput.js";

const app = express();
const port = process.env.PORT;
dotenv.config();

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
app.post("/send-email", validateEmailInput, sendEmail);

// middlewares di errore
app.use(notFoundPage.notFoundRoute);

app.use(handleError);
