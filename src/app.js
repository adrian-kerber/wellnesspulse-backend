import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import authenticateToken from "./middlewares/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/checklist", authenticateToken, checklistRoutes);

app.get("/", (req, res) => {
  res.send("Servidor WellnessPulse rodando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
