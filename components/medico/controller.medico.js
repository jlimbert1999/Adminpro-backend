const Hospital = require('../hospital/model.hospital')
const Medicos = require('./model.medico')

crear_medico = (medico, id_usuario) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newMedico = new Medicos({ usuario: id_usuario, ...medico })
            resolve(await newMedico.save())
        } catch (error) {
            console.log('[Server]: error (registrar medico) => ', error);
            reject({ status: 500, message: 'Error al registrar medico' })
        }


    })


}
obtener_medicos = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const medicosdb = await Medicos.find().populate('usuario', 'nombre img')
                .populate('hospital', 'nombre')
            resolve(medicosdb)
        } catch (error) {
            console.log('[Server]: error (registrar medico) => ', error);
            reject({ status: 500, message: 'Error al registrar medico' })
        }
    })

}
actualizar_medico = (data, id_medico, id_user) => {
    const { hospital } = data
    return new Promise(async (resolve, reject) => {
        try {
            const medicodb = await Medicos.findById(id_medico)
            if (!medicodb) {
                return reject({ code: 401, message: 'El medico para actualizar no existe' })
            }
            const hospitaldb = await Hospital.findById(hospital)
            if (!hospitaldb) {
                return reject({ code: 401, message: 'El hospital para actualizar al medico no existe' })
            }
            const cambios = {
                ...data,
                usuario: id_user
            }
            resolve(await Medicos.findByIdAndUpdate(id_medico, cambios, { new: true }))
        } catch (error) {
            console.log('[Server]: error (actualizar medico)', error);
            reject({ code: 500, message: 'El medico no se pudo actualizar' })
        }
    })
}
eliminar_medico = (id_medico) => {
    return new Promise(async (resolve, reject) => {
        try {
            const medicodb = await Medicos.findById(id_medico)
            if (!medicodb) {
                return reject({ code: 401, message: 'El medico para eliminar no existe' })
            }
            await Medicos.findByIdAndDelete(id_medico)
            resolve("Se elimino el medico")
        } catch (error) {
            console.log('[Server]: error (eliminar medico)', error);
            reject({ code: 500, message: 'El medico no se pudo eliminar' })
        }
    })

}

obtener_medico = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const medicodb = await Medicos.findById(id).populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            if (!medicodb) {
                return reject({ code: 401, message: 'El medico no existe' })
            }
            resolve(medicodb)

        } catch (error) {
            console.log('[Server]: error (obtener un medico)', error);
            reject({ code: 500, message: 'Erro al obtener el medico' })
        }

    })
}
module.exports = {
    crear_medico,
    obtener_medicos,
    actualizar_medico,
    eliminar_medico,
    obtener_medico
}