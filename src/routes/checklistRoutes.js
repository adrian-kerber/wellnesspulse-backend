import express from "express";
import { saveChecklistItems } from "../controllers/checklistController.js";
import { getChecklistItems } from "../controllers/checklistController.js";

const router = express.Router();

router.post("/", saveChecklistItems);
router.get("/", getChecklistItems);

export default router;
