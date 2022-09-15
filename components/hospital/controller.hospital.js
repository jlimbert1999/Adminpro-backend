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
actualizar_hospital = (data, id_hospital, id_user) => {
    //id_user de la persona que esta actualizando
    return new Promise(async (resolve, reject) => {
        try {
            const hospitaldb = await Hospital.findById(id_hospital)
            if (!hospitaldb) {
                return reject({ status: 401, message: 'El hospital para actualizar no existe' })
            }
            const cambios = {
                ...data,
                usuario: id_user
            }
            const updateHospital = await Hospital.findByIdAndUpdate(id_hospital, cambios, { new: true })
            resolve(updateHospital)

        } catch (error) {
            console.log('[Server]: error (actualizar hospital) => ', error);
            return reject({ code: 500, message: 'Error al actualizar hospital' })

        }

    })



}
eliminar_hospital = (id_hospital) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hospitaldb = await Hospital.findById(id_hospital)
            if (!hospitaldb) {
                return reject({ code: 401, message: 'El hospital para elimianr no existe' })
            }
            await Hospital.findByIdAndDelete(id_hospital)
            resolve("el hospital fue eliminado")

        } catch (error) {
            console.log('[Server]: error (eliminar hospital) => ', error);
            reject({ code: 500, message: 'Error al eliminar hospital' })
        }
    })
}

module.exports = {
    crear_hospital,
    obtener_hospitales,
    actualizar_hospital,
    eliminar_hospital
}