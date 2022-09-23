const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const controller = require('./controller.user')
const validarCampos = require('../../middleware/validar-campos')
const { validarToken, validar_AdminRole } = require('../../middleware/validar-jwtToken')

router.get('/', validarToken, (req, res) => {
    const desde = Number(req.query.desde) || 0
    controller.obtener_usuarios(desde).then((result) => {
        res.send({
            ok: true,
            usuarios: result.usuarios,
            total: result.total
        })

    }).catch((err) => {
        res.status(500).send({
            ok: false,
            message: err
        })
    });
})
router.post('/',
    [
        // arreglo de middlewares
        check('nombre', "El nombre es requerido").not().isEmpty(),
        check('password', "El password es requerido").not().isEmpty(),
        check('email', "El email es requerido").isEmail(),
        validarCampos
    ], (req, res) => {
        controller.crear_usuario(req.body).then((result) => {
            res.send({
                ok: true,
                usuario: result.usuario,
                token: result.token
            })

        }).catch((err) => {
            res.status(500).send({
                ok: false,
                message: err
            })
        });


    })

router.get('/', (req, res) => {
    controller.obtener_usuarios().then((usuarios) => {
        res.send({
            ok: true,
            usuarios
        })

    }).catch((err) => {
        res.status(500).send({
            ok: false,
            message: err
        })
    });
})
router.put('/:id',
    [
        validarToken,
        validar_AdminRole,
        check('nombre', "El nombre es requerido").not().isEmpty(),
        check('role', "El rol es requerido").not().isEmpty(),
        check('email', "El email es requerido").isEmail(),
        validarCampos

    ], (req, res) => {
        controller.actualizar_usuario(req.params.id, req.body).then((usuarios) => {
            res.send({
                ok: true,
                usuarios
            })
        }).catch((err) => {
            res.status(500).send({
                ok: false,
                message: err
            })
        });
    })
router.delete('/:id', validarToken, (req, res) => {
    controller.eliminar_usuario(req.params.id).then((message) => {
        res.send({
            ok: true,
            message
        })

    }).catch((err) => {
        res.status(500).send({
            ok: false,
            message: err
        })
    });
})


module.exports = router
