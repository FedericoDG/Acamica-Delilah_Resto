// MIDDLEWARE PARA COMPROBAR EL BODY AL ACTUALIZAR EL ESTADO DE UNA ORDER

const updateCheckBody = (req, res = response, next) => {
  let { status } = req.body;
  if (!status) {
    return res.status(400).json({
      mensaje: "el campo status es requerido."
    });
  }
  status = status.toUpperCase();
  if (status !== 'NEW' && status !== 'CONFIRMED' && status !== 'PREPARING' && status !== 'DELIVERED' && status !== 'CANCELED') {
    return res.status(400).json({
      mensaje: "el campo status es debe ser NEW, CONFIRMED, PREPARING, DELIVERED o CANCELED."
    });
  }
  req.status = status;
  next();
};

module.exports = updateCheckBody;