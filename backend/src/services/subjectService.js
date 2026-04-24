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

module.exports = {
  createSubject
};
