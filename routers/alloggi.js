import express from "express";
import alloggioController from "../controllers/alloggioController.js";


const router = express.Router();

// INDEX
router.get("/", alloggioController.index);

export default router;