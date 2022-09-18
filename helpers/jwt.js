const jwt = require('jsonwebtoken')

const generarToken = (_id, nombre, role, google, email, img) => {
    return new Promise((resolve, reject) => {
        //informacion que sera decodificada en frontend
        const payload = {
            _id,
            nombre,
            role,
            google,
            email,
            img
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
module.exports = {
    generarToken
}