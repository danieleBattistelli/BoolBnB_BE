
import express from "express";
import immobileController from "../controllers/immobileController.js";
import { uploadMultiple } from "../middlewares/fileUpload.js";

const router = express.Router();

// INDEX
router.get("/", immobileController.index);

// SHOW
router.get("/:slug" ,immobileController.show);

// DESTROY
router.delete("/:slug", immobileController.destroy);

// STORE
router.post("/", uploadMultiple, immobileController.store);

// MODIFY
router.put("/:slug", immobileController.modify);


export default router;