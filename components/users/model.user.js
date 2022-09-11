const { Schema, model } = require('mongoose')

const UserScheme = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
})
UserScheme.method('toJSON', function () {
    //convertir el documento mongoose a object
    const { __v, password, ...object } = this.toObject()
    return object
})

module.exports = model('Usuarios', UserScheme)