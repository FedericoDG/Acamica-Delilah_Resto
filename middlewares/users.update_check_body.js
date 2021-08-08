// MIDDLEWARE PARA COMPROBAR EL BODY AL AZTUALIZAR UN NUEVO USUARIO (se utilizan algunas expresiones regulares)
const { response } = require('express');

const checkPassword = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,50}/; // Al menos una letra mayúscula, una minúscula, un número y un caracter especial. Longitud entre 8 y 50 caracteres
const checkName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/; // Letras mayúsculas y minúsculas, y espacios. Longitud entre 4 y 50 caracteres
const checkPhone = /^[0-9]{10}$/; // Números. Longitud de 10 caracteres

const verifyBodyUpdate = (req, res = response, next) => {
  let { password, name, phone, address } = req.body;
  if (!password || !name || !phone || !address) {
    return res.status(400).json({
      mensaje: 'Todos los campos son obligatorios: password, name, hone, address.'
    });
  }
  if (!checkPassword.test(password)) {
    return res.status(400).json({
      mensaje: 'El campo contraseña de tener un mínimo 8 caracteres, e incluir al menos una letra en mayúscula y un caracter especial.'
    });
  }
  if (!checkName.test(name)) {
    return res.status(400).json({
      mensaje: 'El campo name debe tener al menos 4 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (!checkPhone.test(phone)) {
    return res.status(400).json({
      mensaje: 'El campo phone debe tener exactemente 10 caracteres númericos.'
    });
  }
  req.user = { password, name, phone, address };
  next();
};

module.exports = verifyBodyUpdate;