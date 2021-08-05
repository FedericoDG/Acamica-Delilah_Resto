// MIDDLEWARE PARA COMPRAR QUE EL ID PASADO POR PARÁMETRO SEA IGUAL AL QUE VIENE EN EL PAYLOAD DE LA TOKEN
const {decodeToken} = require('../helpers/helpers')

const idEqualUserid = (req,res,next)=>{
  const id = req.params.id
  const token = req.headers.authorization.split(' ')[1]
  const role = decodeToken(token, process.env.SECRET).role;
  const user_id = decodeToken(token, process.env.SECRET).user_id;
  if(role !== 'ADMIN'){
    if (id != user_id) {
      return res.status(401).json({
        mensaje: 'Permisos insuficientes para ver información de ese usuario',
        sugerencia: `Puedes ver/actualizar tu información utilizando tu user_id: ${user_id}`
      })
    }
  }
  next()
}

module.exports= idEqualUserid