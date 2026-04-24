const subjectService = require('../services/subjectService');

const createSubject = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: name y userId.' });
    }

    const subject = await subjectService.createSubject({ name, description, userId });
    res.status(201).json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    // Prisma ForeignKey constraint failed
    if (error.code === 'P2003') {
      return res.status(404).json({ error: 'El usuario especificado no existe.' });
    }
    res.status(500).json({ error: 'Error interno al crear la materia.' });
  }
};

module.exports = {
  createSubject
};
