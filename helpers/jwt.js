const jwt = require('jsonwebtoken')

const generarToken = (_id, nombre, role) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            nombre,
            role
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                reject('No se puedo generar el token')
            }
            else {
                resolve(token)
            }
        })
    })
}
module.exports={
    generarToken
}