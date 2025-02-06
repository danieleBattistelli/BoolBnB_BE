
import express from "express";
import recensioneController from "../controllers/recensioneController.js";

const router = express.Router();

// INDEX
router.get("/", recensioneController.index);


export default router;