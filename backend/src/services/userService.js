const prisma = require('../config/db');

const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name
    }
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

module.exports = {
  createUser,
  getAllUsers
};
