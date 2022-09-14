const { Router } = require('express')
const router = Router()

const { check } = require('express-validator')
const validarCampos = require('../../middleware/validar-campos')
const { validarToken } = require('../../middleware/validar-jwttoken')
const controller = require('./controller.hospital')

router.get('', (req, res) => {
    controller.obtener_hospitales().then((hospitales) => {
        res.status(200).send({
            ok: true,
            hospitales
        })
    })
})
router.post('',
    [
        validarToken,
        check('nombre', 'El nombre del hospital es requerdio').not().isEmpty(),
        validarCampos
    ]
    , (req, res) => {
        //id user se inserta en la request cuando se usa el middleware validarToken
        controller.crear_hospital(req.body, req._id).then((result) => {
            res.status(201).send({
                ok: true,
                hospital: result
            })
        }).catch((err) => {
            res.status(err.code).send({
                ok: false,
                message: err.message
            })
        });
    })
router.put('', (req, res) => {
    res.status
})
router.delete('', (req, res) => {

})
module.exports = router