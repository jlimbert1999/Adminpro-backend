getMenuFrontend = (role) => {
    const menu = [
        {
            title: 'Dashboard', icon: 'mdi mdi-gauge',
            submenu: [
                {
                    titulo: 'Main',
                    url: '/'
                },
                {
                    titulo: 'Progressbar',
                    url: 'progress'
                },
                {
                    titulo: 'Grafica',
                    url: 'grafica1'
                },
            ]
        },
        {
            title: 'Mantenimientos', icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // {
                //     titulo: 'Usuarios',
                //     url: 'usuarios'
                // },
                {
                    titulo: 'Hospitales',
                    url: 'hospitales'
                },
                {
                    titulo: 'Medicos',
                    url: 'medicos'
                },
            ]
        },
    ]
    if (role == 'ADMIN_ROLE') {
        menu[1].submenu.unshift(
            {
                titulo: 'Usuarios',
                url: 'usuarios'
            }
        )
    }
    return menu
}
module.exports = {
    getMenuFrontend
}