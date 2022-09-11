const storage = require('./storage.user')
const bcrypt = require('bcryptjs')
const jwt = require('../../helpers/jwt')
//Controlador debe regresar promesa para que funcione el thenc en router
crear_usuario = (usuario) => {
    let { email, password } = usuario
    return new Promise(async (resolve, reject) => {
        try {
            const existeEmail = await storage.verifyExisteEmail(email)
            if (existeEmail) {
                return reject("El correo ya existe, intente con uno nuevo")
            }
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt)

            const usuariodb = await storage.addUser(usuario)
            const token = await jwt.generarToken(usuario._id, usuariodb.nombre, usuariodb.role)
            resolve({ usuario: usuariodb, token })
        } catch (error) {
            console.log('[Server]: Error (crear usuario) =>', error);
            reject('No se pudo registrar al usuario')
        }
    })
}
obtener_usuarios = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await storage.getUsers())
        } catch (error) {
            console.log('[Server]: Error (obtener usuarios) =>', error);
            reject('No se obtener a los usuarios')
        }
    })

}
actualizar_usuario = (id_user, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuariodb = await storage.verifyExisteUser(id_user)
            if (!usuariodb) {
                return reject('El usuario con ese id no existe')
            }
            if (usuariodb.email == body.email) {
                //email es igual por lo que no quiere actualizar
                delete body.email
            }
            else {
                const existeEmail = await storage.verifyExisteEmail(body.email)
                if (existeEmail) {
                    return reject("El correo ya existe, intente con uno nuevo")
                }
            }
            //Campos de password y google  no se actualizan si envia
            const campos = body
            delete campos.password
            delete campos.google
            resolve(await storage.putUser(id_user, campos))
        } catch (error) {
            console.log('[Server]: Error (actualizar usuario) =>', error);
            reject('No se pudo actualizar al usuario')
        }
    })

}
eliminar_usuario = (id_user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuariodb = await storage.verifyExisteUser(id_user)
            if (!usuariodb) {
                return reject('El usuario con ese id no existe')
            }
            await storage.deleteUser(id_user)
            resolve("El usuario fue eliminado")
        } catch (error) {
            console.log('[Server]: Error (eliminar usuario) =>', error);
            reject('No se pudo eliminar al usuario')
        }
    })
}

module.exports = {
    obtener_usuarios,
    crear_usuario,
    actualizar_usuario,
    eliminar_usuario
}