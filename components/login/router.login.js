const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const controller = require('./controller.login')
const validarCampos = require('../../middleware/validar-campos')


router.post('/',
    [
        check('email', "El email es requerido").isEmail(),
        check('password', "El password es requerido").not().isEmpty(),
        validarCampos
    ], (req, res) => {
        controller.login(req.body).then((token) => {
            res.send({
                ok: true,
                token
            })

        }).catch((err) => {
            res.status(err.status).send({
                ok: false,
                message: err.message
            })
        });
    })
router.post('/google',
    [
        check('token', "El token de google es obligatorio").not().notEmpty(),
        validarCampos
    ], (req, res) => {
        controller.login_google(req.body.token).then((token) => {
            res.send({
                ok: true,
                token
            })
        }).catch((err) => {
            res.status(err.status).send({
                ok: false,
                message: err.message
            })
        });
    })


module.exports = router