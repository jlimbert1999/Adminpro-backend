const { Router } = require('express')
const router = Router()
const fileUpload = require("express-fileupload");
const { cargar_archivo, mostrar_imagen } = require('./controller.upload')

router.use(fileUpload())
router.put('/:tabla/:id', cargar_archivo)
router.get('/:tabla/:imagen', mostrar_imagen)

module.exports = router