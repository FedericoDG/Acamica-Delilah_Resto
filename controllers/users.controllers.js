const { response } = require('express');
const { getAllUsers, getUserById, hashPassword, saveUserOnDB, createToken, updateUserOnDB, deleteUserOnDB } = require('../helpers/helpers');

// OBTENER USUARIOS
const getUsers = async (req, res = response) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const users = await getAllUsers(token);
    res.json({
      mensaje: 'Lista de usuarios.',
      usuarios: users
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// OBTENER UN USUARIO POR USER_ID
const getUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const user = await getUserById(token, id);
    res.json({
      mensaje: 'Usuario encontrado.',
      usuario: user[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// REGISTAR UN USUARIO
const registerUser = async (req, res = response) => {
  try {
    const hashedPassword = hashPassword(req.user.password);
    const user = await saveUserOnDB({ ...req.user, password: hashedPassword });
    res.json({
      mensaje: 'Usuario creado.',
      usuario: { user_id: user.insertId, ...req.user, password: '*******' }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// LOGUEAR UN USUARIO (asignación de un token)
const loginUser = (req, res = response) => {
  try {
    const token = createToken(req.user);
    res.json({
      mensaje: 'Token creada.',
      token
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// ACTUALIZAR UN USUARIO
const updateUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const hashedPassword = hashPassword(req.user.password);
    await updateUserOnDB({ ...req.user, password: hashedPassword }, id);
    res.json({
      mensaje: 'Usuario actualizado.',
      usuario: { user_id: id, ...req.user, password: '*******' }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// ELIMINAR UN USUARIO
const deleteUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const user = await getUserById(token, id);
    await deleteUserOnDB(id);
    res.json({
      mensaje: 'Usuario eliminado.',
      usuario: user[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = {
  registerUser, loginUser, getUsers, getUser, updateUser, deleteUser
};