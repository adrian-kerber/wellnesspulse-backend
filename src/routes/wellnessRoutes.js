import { Router } from "express";
import { createRecord, getRecords } from "../controllers/wellnessController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Proteger todas as rotas abaixo com autenticação
router.use(authenticateToken);

router.post("/records", createRecord);
router.get("/records", getRecords);

export default router;
