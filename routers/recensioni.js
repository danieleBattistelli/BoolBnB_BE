import express from "express";
import recensioneController from "../controllers/recensioneController.js";


const router = express.Router();

// STORE
router.post("/:id_immobile", recensioneController.store);

export default router;