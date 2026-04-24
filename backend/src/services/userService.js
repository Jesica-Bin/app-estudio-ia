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

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id }
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser
};
