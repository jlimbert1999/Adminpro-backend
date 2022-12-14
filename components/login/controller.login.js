const bcrypt = require('bcryptjs')
const { generarToken } = require('../../helpers/jwt')
const Usuarios = require('../users/model.user')
const { googleVerify } = require('../../helpers/google-singin')
const { getMenuFrontend } = require('../../helpers/menu-frontend')

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
                const token = await generarToken(usuariodb._id, usuariodb.nombre, usuariodb.role, usuariodb.google, usuariodb.email, usuariodb.img)
                resolve({ token, menu: getMenuFrontend(usuariodb.role) })
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


login_google = (tokenGoogle) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, name, picture } = await googleVerify(tokenGoogle)
            const usuariodb = await Usuarios.findOne({ email })
            let newUser
            if (!usuariodb) {
                //user no existe
                newUser = new Usuarios({
                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true
                })
            }
            else {
                //existe usuario
                newUser = usuariodb
                newUser.google = true
                newUser.password = '@@@'
            }
            //guadar cambios
            await newUser.save()
            const token = await generarToken(newUser._id, newUser.nombre, newUser.role, usuariodb.google, usuariodb.email, usuariodb.img)
            resolve({ token, menu: getMenuFrontend(usuariodb.role) })
        } catch (error) {
            reject({ status: 401, message: 'token de google invalido' })
        }
    })
}

const renewToken = async (id_user) => {
    try {
        const usuariodb = await Usuarios.findById(id_user)
        const token = await generarToken(id_user, usuariodb.nombre, usuariodb.role, usuariodb.google, usuariodb.email, usuariodb.img)
        return { token, menu: getMenuFrontend(usuariodb.role) }

    } catch (error) {
        console.log('[Server]: Error al renovar token', error);
    }


}

module.exports = {
    login,
    login_google,
    renewToken
}