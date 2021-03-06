// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UN NUEVO USUARIO (se utilizan algunas expresiones regulares)
const { response } = require('express');

const checkUserame = /^[0-9a-zA-Z]{4,50}$/; // Letras mayúsculas y minúsculas, números. Logitud entre 4 y 50 caracteres
const checkPassword = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,50}/; // Al menos una letra mayúscula, una minúscula, un número y un caracter especial. Longitud entre 8 y 50 caracteres
const checkName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/; // Letras mayúsculas y minúsculas, y espacios. Longitud entre 4 y 50 caracteres
const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido
const checkPhone = /^[0-9]{10}$/; // Números. Longitud de 10 caracteres

const verifyBodyRegister = (req, res = response, next) => {
  let { username, password, name, email, phone, address } = req.body;
  if (!username || !password || !name || !email || !phone || !address) {
    return res.status(400).json({
      mensaje: 'Todos los campos son obligatorios: username, password, name, email, phone, address.'
    });
  }
  if (!checkUserame.test(username)) {
    return res.status(400).json({
      mensaje: 'El campo username debe tener al menos 4 caracteres, no más de 50, y no debe contener caracteres especiales, salvo números.'
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
  email = email.toLowerCase();
  if (!checkEmail.test(email)) {
    return res.status(400).json({
      mensaje: 'El campo email deber contener un email válido.'
    });
  }
  if (!checkPhone.test(phone)) {
    return res.status(400).json({
      mensaje: 'El campo phone debe tener exactemente 10 caracteres númericos.'
    });
  }
  next();
};

module.exports = verifyBodyRegister;