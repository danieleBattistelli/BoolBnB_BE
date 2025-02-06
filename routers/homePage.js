import express from "express";
import homeController from "../controllers/homeController.js";

const router = express.Router();

// INDEX
router.get("/", homeController.index);


export default router;