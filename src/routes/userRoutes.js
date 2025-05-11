import express from "express";
import { getCurrentUser, updatePassword } from "../controllers/userController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/me", getCurrentUser);
router.put("/password", updatePassword);

export default router;
