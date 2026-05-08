const prisma = require('../config/db');

const createSubject = async (subjectData) => {
  return await prisma.subject.create({
    data: {
      name: subjectData.name,
      description: subjectData.description,
      userId: subjectData.userId
    }
  });
};

const getAllSubjects = async () => {
  return await prisma.subject.findMany();
};

const getSubjectById = async (id) => {
  return await prisma.subject.findUnique({
    where: { id }
  });
};

const deleteSubject = async (id) => {
  return await prisma.subject.delete({
    where: { id }
  });
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  deleteSubject
};
