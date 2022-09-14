
const routes_user = require('./components/users/router.user')
const routes_login = require('./components/login/router.login')
const routes_hospital = require('./components/hospital/router.hospital')
const routes_medicos = require('./components/medico/router.medico')

const routes_busqueda = require('./components/busqueda/router.busqueda')
const routes_uploads = require('./components/subir-archivos/router.upload')
const routes = (server) => {
    server.use('/usuarios', routes_user)
    server.use('/login', routes_login)
    server.use('/hospitales', routes_hospital)
    server.use('/medicos', routes_medicos)
    server.use('/todo', routes_busqueda)
    server.use('/uploads', routes_uploads)
}

module.exports = routes