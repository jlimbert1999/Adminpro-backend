const jwt = require('jsonwebtoken')
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

module.exports = {
    validarToken
}
