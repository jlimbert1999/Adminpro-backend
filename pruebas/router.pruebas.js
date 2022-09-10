const express = require('express')
const router = express.Router()

router.get('/prueba', (req, res) => {
    res.send({
        ok: true,
        message: 'hola'
    })
})

module.exports = router




