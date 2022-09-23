const { Router } = require('express')
const router = Router()
const { getTodo, getDocumentosColeccion } = require('./controller.busqueda')

const { validarToken } = require('../../middleware/validar-jwt')

router.get('/:busqueda', validarToken, getTodo)


router.get('/coleccion/:tabla/:busqueda', validarToken, getDocumentosColeccion)

module.exports = router