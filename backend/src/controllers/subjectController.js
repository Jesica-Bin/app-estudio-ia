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

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: 'Error al obtener las materias.' });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await subjectService.getSubjectById(id);
    if (!subject) {
      return res.status(404).json({ error: 'Materia no encontrada.' });
    }
    res.status(200).json(subject);
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    res.status(500).json({ error: 'Error al obtener la materia.' });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById
};
