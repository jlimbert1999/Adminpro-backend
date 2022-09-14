const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarToken } = require('../../middleware/validar-jwttoken')
const validarCampos = require('../../middleware/validar-campos')
const controller = require('./controller.medico')

router.get('', (req, res) => {
    controller.obtener_medicos().then((medicos) => {
        res.status(200).send({
            ok: true,
            medicos
        })
    }).catch((err) => {
        res.status(err.status).send({
            ok: false,
            message: err.message
        })
    });
})
router.post('',
    [
        validarToken,
        check('nombre', 'nombre de medico es requerido').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ]
    , (req, res) => {
        controller.crear_medico(req.body, req._id).then((result) => {
            res.status(201).send({
                ok: true,
                medico: result
            })
        }).catch((err) => {
            res.status(err.status).send({
                ok: false,
                message: err.message
            })
        });
    })
router.put('', (req, res) => {

})
router.delete('', (req, res) => {

})
module.exports = router