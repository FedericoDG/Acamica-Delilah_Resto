const { getAllUsers, getUserById, hashPassword, saveUserOnDB, createToken, updateUserOnDB, deleteUserOnDB } = require('../helpers/helpers');

const getUsers = async (req, res = response) => {
  try {
    const users = await getAllUsers(req.headers.authorization.split(' ')[1]);
    res.json({
      users
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const getUser = async (req, res = response) => {
  try {
    const user = await getUserById(req.headers.authorization.split(' ')[1], req.params.id);
    res.json({
      user
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const registerUser = async (req, res = response) => {
  try {
    const hashedPassword = hashPassword(req.user.password);
    await saveUserOnDB({ ...req.user, password: hashedPassword });
    res.json({
      mensaje: 'Usuario agregado a la base de datos.',
      usuario: { ...req.user, password: '* * * * * * *' }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const loginUser = (req, res = response) => {
  try {
    const token = createToken(req.user);
    res.json({
      token
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const updateUser = async (req, res = response) => {
  try {
    const hashedPassword = hashPassword(req.user.password);
    await updateUserOnDB({ ...req.user, password: hashedPassword }, req.params.id);
    res.json({
      mensaje: 'Usuario actualizado en la base de datos.',
      usuario: { ...req.user, password: '* * * * * * *' }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    await deleteUserOnDB(req.params.id);
    res.json({
      mensaje: 'Usuario eliminado de la base de datos.'
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