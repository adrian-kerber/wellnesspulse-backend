import prisma from "../lib/prismaClient.js";
import bcrypt from "bcrypt";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true },
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) return res.status(401).json({ error: "Senha atual incorreta" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed },
    });

    res.json({ message: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    res.status(500).json({ error: "Erro interno" });
  }
};
