import prisma from "../lib/prismaClient.js";

export const saveChecklistItems = async (req, res) => {
  const userId = req.user.id;
  const { additions, updates, deletions } = req.body;

  try {
    if (Array.isArray(additions)) {
      for (const item of additions) {
        await prisma.checklistItem.create({
          data: {
            userId,
            day: item.day,
            text: item.text,
            done: item.done || false
          }
        });
      }
    }

    

    if (Array.isArray(updates)) {
      for (const item of updates) {
        await prisma.checklistItem.update({
          where: { id: item.id },
          data: {
            text: item.text,
            done: item.done
          }
        });
      }
    }

    if (Array.isArray(deletions)) {
      await prisma.checklistItem.deleteMany({
        where: {
          id: { in: deletions },
          userId
        }
      });
    }

    res.status(200).json({ message: "Checklist salvo com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar checklist:", error);
    res.status(500).json({ error: "Erro ao salvar checklist." });
  }
};

export const getChecklistItems = async (req, res) => {
    const userId = req.user.id;
    try {
      const items = await prisma.checklistItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      res.json(items);
    } catch (err) {
      console.error("Erro ao carregar checklist:", err);
      res.status(500).json({ error: "Erro ao carregar checklist" });
    }
  };