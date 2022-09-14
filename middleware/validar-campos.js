const { validationResult } = require('express-validator')
const { response } = require('express')

const validarCampos = (req, res = response, next) => {
    const erroresBody = validationResult(req)
    if (!erroresBody.isEmpty()) {
        console.log('[Server]: Error (faltan parametros para registrar o actualizar) =>', erroresBody.mapped());
        return res.status(400).send({
            ok: false,
            message: "Faltan parametros",
            errors: erroresBody.mapped()
        })
    }
    next();

}

module.exports = validarCampos