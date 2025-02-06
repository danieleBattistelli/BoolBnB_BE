
import express from "express";
import immobileController from "../controllers/immobileController.js";

const router = express.Router();

// INDEX
router.get("/", immobileController.index);


export default router;