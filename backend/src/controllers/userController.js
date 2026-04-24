const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: email y name.' });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'El formato del email es inválido.' });
    }

    const user = await userService.createUser({ email, name });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser
};
