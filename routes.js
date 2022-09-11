
const routes_user = require('./components/users/router.user')
const routes_login = require('./components/login/router.login')
const routes = (server) => {
    server.use('/usuarios', routes_user)
    server.use('/login', routes_login)
}

module.exports = routes