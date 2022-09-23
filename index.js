const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path=require('path')

const dbConection = require('./database/config')
const allroutes = require('./routes')

//COnfigurar cors para peticiones de todos los dominios
app.use(cors())

//Lectura del body
app.use(express.json())

//Conexion con la BD
dbConection()

//Establecer rutas de componentes
app.use(express.static('public'))
allroutes(app)

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})



app.listen(process.env.PORT, () => {
    console.log('Server listen in port', process.env.PORT);
})
