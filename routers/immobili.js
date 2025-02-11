
import express from "express";
import immobileController from "../controllers/immobileController.js";

const router = express.Router();

// INDEX
router.get("/", immobileController.index);

// SHOW
router.get("/:slug" ,immobileController.show);

// DESTROY
router.delete("/:slug", immobileController.destroy);

// STORE
router.post("/", immobileController.store);

// MODIFY
router.put("/:id", immobileController.modify);


export default router;