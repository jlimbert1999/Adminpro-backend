const Usuarios = require('./model.user')
//el controlador experara a que esta funcion acabe
addUser = (usuario) => {
    const usuariodb = new Usuarios(usuario);
    return usuariodb.save()
}
getUsers = () => {
    return Usuarios.find({}, 'nombre email role google')
}
putUser = (id, data) => {
    return Usuarios.findByIdAndUpdate(id, data, { new: true })
}
deleteUser = (id) => {
    return Usuarios.findByIdAndDelete(id)
}
verifyExisteEmail = (email) => {
    //verificar correo repetido
    return Usuarios.findOne({ email })
}
verifyExisteUser = (id) => {
    //verificar si id user existe
    return Usuarios.findById(id)
}


module.exports = {
    addUser,
    getUsers,
    putUser,
    deleteUser,

    verifyExisteEmail,
    verifyExisteUser
}