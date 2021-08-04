const { saveUserOnDB, hashPassword, createToken } = require('../helpers/helpers');

const register = async (req, res = response) => {
  //let { username, password, name, email, phone, address } = req.body;
  const hashedPassword = hashPassword(req.user.password);
  const usuario = await saveUserOnDB({ ...req.user, password: hashedPassword });
  res.json({
    mensaje: 'Usuario agregado a la base de datos.',
    usuario: { ...req.user, password: '*********' }
  });
};

const login = (req, res = response) => {
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

module.exports = {
  register, login
};