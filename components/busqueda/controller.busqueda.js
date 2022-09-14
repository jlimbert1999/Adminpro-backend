const { response } = require('express')
const Usuarios = require('../users/model.user')
const Medicos = require('../medico/model.medico')
const Hospitales = require('../hospital/model.hospital')
getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda
    //expresion regular, permitira que encuentre valores que se parezcan y no sea extamente igual
    const regex = new RegExp(busqueda, 'i')
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuarios.find(
            { nombre: regex }
        ),
        Medicos.find(
            { nombre: regex }
        ),
        Hospitales.find(
            { nombre: regex }
        )
    ])
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

getDocumentosColeccion = async (req, res = response) => {
    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i')
    let data = []
    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img')
            break;
        case 'hospitales':
            data = await Hospitales.find({ nombre: regex }).populate('usuario', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuarios.find({ nombre: regex })
            break;
        default:
            return res.status(400).json({
                ok: true,
                message: 'La tabla debe ser usuarios/hospitales/medicos'
            })
    }
    res.json({
        ok: true,
        data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion

}