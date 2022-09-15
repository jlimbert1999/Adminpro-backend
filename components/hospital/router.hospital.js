const { Router } = require('express')
const router = Router()

const { check, body } = require('express-validator')
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
router.put('/:id',
    [
        validarToken,
        check('nombre', 'El nombre es requerido'),
        validarCampos
    ],
    (req, res) => {
        controller.actualizar_hospital(req.body, req.params.id, req._id).then((hospital) => {
            res.status(200).json({
                ok: true,
                hospital,
                message: 'Se actualizo el hospital'
            })
        }).catch((err) => {
            res.status(err.code).send({
                ok: false,
                message: err.message
            })
        });
    })

router.delete('/:id', validarToken, (req, res) => {
    controller.eliminar_hospital(req.params.id).then((message) => {
        res.status(200).json({
            ok: true,
            message
        })
    }).catch((err) => {
        res.status(err.code).send({
            ok: false,
            message: err.message
        })
    });

})
module.exports = router