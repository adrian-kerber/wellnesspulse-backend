import prisma from "../lib/prismaClient.js";

export const createRecord = async (req, res) => {
  const { emotion, note } = req.body;
  const userId = req.user.id; // capturar ID do usuário autenticado

  try {
    const newRecord = await prisma.wellnessRecord.create({
      data: {
        emotion,
        note,
        userId,
      },
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar registro." });
  }
};

export const getRecords = async (req, res) => {
  const userId = req.user.id;

  try {
    const records = await prisma.wellnessRecord.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar registros." });
  }
};
