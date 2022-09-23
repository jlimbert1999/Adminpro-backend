const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarToken } = require('../../middleware/validar-jwt')
const validarCampos = require('../../middleware/validar-campos')
const controller = require('./controller.medico')

router.get('', validarToken, (req, res) => {
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
router.get('/:id', validarToken,(req, res) => {
    const id_medico = req.params.id
    controller.obtener_medico(id_medico).then(medico => {
        res.status(200).send({
            ok: true,
            medico
        })
    }).catch((err) => {
        res.status(err.code).send({
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
router.put('/:id',
    [
        validarToken,
        check('nombre', 'El nombre es requerido').not().notEmpty(),
        check('hospital', 'El hospital es requerido').isMongoId(),
        validarCampos
    ]
    , (req, res) => {
        controller.actualizar_medico(req.body, req.params.id, req._id).then((medico) => {
            res.status(201).send({
                ok: true,
                medico
            })
        }).catch((err) => {
            res.status(err.code).send({
                ok: false,
                message: err.message
            })
        });
    })
router.delete('/:id', validarToken, (req, res) => {
    controller.eliminar_medico(req.params.id).then((message) => {
        res.status(201).json({
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