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
module.exports = {
    crear_medico,
    obtener_medicos
}