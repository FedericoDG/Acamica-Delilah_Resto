// MIDDLEWARE PARA COMPROBAR SI LA ORDEN CONSULTADA PERTENECE AL USUARIO QUE REQUIERE LA INFORMACIÓN
const database = require('../database/conection');
const { decodeToken } = require('../helpers/helpers');

const userIdHasOrderId = async (req, res, next) => {
  const order_id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const role = decodeToken(token, process.env.SECRET).role;
  const user_id = decodeToken(token, process.env.SECRET).user_id;

  let consulta = await new Promise((resolve, reject) => {
    const sqlQuery = "SELECT user_id FROM orders WHERE order_id = ?";
    database.query(sqlQuery, [order_id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  consulta = consulta[0]?.user_id || -1
  if (role !== 'ADMIN') {
    if (consulta != user_id) {
      return res.status(401).json({
        mensaje: 'Permisos insuficientes para ver acceder a esta información',
      });
    }
  }
  next();
};

module.exports = userIdHasOrderId;