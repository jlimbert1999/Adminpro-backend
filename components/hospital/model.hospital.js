const { Schema, model } = require('mongoose')

const HospitalScheme = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        //Relacion con esquema de usuarios
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
}, { collection: 'hospitales' })    //nombre de la coleccion (Opcional)
HospitalScheme.method('toJSON', function () {
    //convertir el documento mongoose a object
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Hospitales', HospitalScheme)