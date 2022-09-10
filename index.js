const express = require('express')
const app = express()
const cors = require('cors')

const routerprueba = require('./pruebas/router.pruebas')
const dbConection = require('./database/config')
require('dotenv').config()
app.use(cors())
dbConection()

app.use(routerprueba)


app.listen(process.env.PORT, () => {
    console.log('Server listen in port', process.env.PORT);
})
