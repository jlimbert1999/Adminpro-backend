const { Schema, model } = require('mongoose')

const MedicoScheme = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        //Relacion con esquema de usuarios
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    hospital: {
        //Relacion con esquema de hospital
        type: Schema.Types.ObjectId,
        ref: 'Hospitales',
        required: true
    }
})
MedicoScheme.method('toJSON', function () {
    //convertir el documento mongoose a object
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Medicos', MedicoScheme)