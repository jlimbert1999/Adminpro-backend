const bcrypt = require('bcryptjs')
const { generarToken } = require('../../helpers/jwt')
const Usuarios = require('../users/model.user')

login = (credenciales) => {
    const { email, password } = credenciales
    return new Promise(async (resolve, reject) => {
        try {
           
            const usuariodb = await Usuarios.findOne({ email })
            if (!usuariodb) {
                return reject({
                    status: 400,
                    message: 'El email o contraseña no son correctos'
                })
            }
            const validPassword = bcrypt.compareSync(password, usuariodb.password)
            if (!validPassword) {
                return reject({
                    status: 400,
                    message: 'El email o contraseña no son correctos'
                })
            }
            //Generacion token
            try {
                const token = await generarToken(usuariodb._id)
                resolve(token)
            } catch (error) {
                console.log('[Server]: Error (generacion token) =>', error);
                return reject({ status: 500, message: 'Error en login' })
            }


        } catch (error) {
            console.log('[Server]: Error (login) =>', error);
            reject({ status: 500, message: 'Error en login' })
        }
    })
}

module.exports = {
    login
}