const jwt = require('jsonwebtoken')
const Usuarios = require('../components/users/model.user')
const validarToken = (req, res, next) => {
    const token = req.header('token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'debe iniciar sesion'
        })
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Sesion invalida'
        })
    }

}

const validar_AdminRole = async (req, res, next) => {
    //id ya esta en la request luego de hacer el validar token

    try {
        const usuariodb = await Usuarios.findById(req._id)
        if (!usuariodb) {
            return res.status(401).json({
                ok: false,
                message: 'El administrador no existe'
            })
        }
        if (usuariodb.role !== 'ADMIN_ROLE' && usuariodb._id != req.params.id) {
            //si es el mismo usuario que se esta intentando actualizar, se debe permitir
            return res.status(401).json({
                ok: false,
                message: 'No tiene el rol administrador'
            })

        }
        next()
    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: 'Ocurrio un error'
        })
    }

}

module.exports = {
    validarToken,
    validar_AdminRole
}
