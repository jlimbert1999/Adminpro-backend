const Hospital = require('./model.hospital')

crear_hospital = (hospital, id_usuario) => {
    return new Promise(async (resolve, reject) => {
        const newHospital = new Hospital({ usuario: id_usuario, ...hospital })
        try {
            resolve(await newHospital.save())
        } catch (error) {
            console.log('[Server]: error (crear hospital) =>', error);
            reject({ message: "Error al registrar un hospital", code: 500 })
        }
    })
}
obtener_hospitales = () => {
    return new Promise(async (resolve, reject) => {
        resolve(await Hospital.find().populate('usuario', 'nombre img'))
    })
}
actualizar_hospital = () => {

}
eliminar_hospital = () => {

}

module.exports = {
    crear_hospital,
    obtener_hospitales,
    actualizar_hospital,
    eliminar_hospital
}