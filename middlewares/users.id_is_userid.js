// MIDDLEWARE PARA COMPRAR QUE EL ID PASADO POR PARÁMETRO SEA IGUAL AL QUE VIAJA EN EL PAYLOAD DEL TOKEN
const {decodeToken} = require('../helpers/helpers')

const idEqualUserid = (req,res,next)=>{
  const id = req.params.id
  const token = req.headers.authorization.split(' ')[1]
  const role = decodeToken(token, process.env.SECRET).role;
  const user_id = decodeToken(token, process.env.SECRET).user_id;
  if(role !== 'ADMIN'){
    if (id != user_id) {
      return res.status(401).json({
        mensaje: 'Permisos insuficientes para ver acceder.',
      })
    }
  }
  next()
}

module.exports= idEqualUserid