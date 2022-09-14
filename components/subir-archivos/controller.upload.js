const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const Usuarios = require('../users/model.user')
const Hospitales = require('../hospital/model.hospital')
const Medicos = require('../medico/model.medico')
const fs = require('fs')
const path = require('path')

cargar_archivo = async (req, res = response) => {
    const tabla = req.params.tabla
    const id = req.params.id
    const tablasValidas = ['medicos', 'usuarios', 'hospitales']
    if (!tablasValidas.includes(tabla)) {
        console.log('[Server]: error (Archivo subido debe ser para usuarios/hospitales/medicos)');
        return res.status(500).json({
            ok: false,
            message: 'error al subir la imagen'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No se encontro ninguna archivo para subir'
        })
    }
    const extensionesValidas = ['png', 'jpeg', 'jpg', 'gif']
    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.json({
            ok: false,
            message: 'La imagen debe ser png/jpeg/jpg/gif'
        })
    }
    //generar nombre de archivo
    const nombreFile = `${uuidv4()}.${extensionArchivo}`

    //crear path de guardado
    const pathImg = `./uploads/${tabla}/${nombreFile}`

    //actualizacion de imagen en db
    switch (tabla) {
        case 'usuarios':
            const usuariodb = await Usuarios.findById(id)
            if (!usuariodb) {
                return res.json({
                    ok: true,
                    message: 'El usuario para actualizar la imagen no existe'
                })
            }
            pathImgActual = `./uploads/usuarios/${usuariodb.img}`
            file.mv(pathImg, (err) => {
                if (err) {
                    console.log('[Server]: error (guardar imagen)', err);
                    return res.json({
                        ok: false,
                        message: 'Error al guardar la imagen'
                    })
                }
                borrar_img(pathImgActual)
            })

            usuariodb.img = nombreFile
            await usuariodb.save()
            break;

        case 'medicos':
            const medicodb = await Medicos.findById(id)
            if (!medicodb) {
                return res.json({
                    ok: true,
                    message: 'El medico para actualizar la imagen no existe'
                })
            }
            pathImgActual = `./uploads/medicos/${medicodb.img}`
            file.mv(pathImg, (err) => {
                if (err) {
                    console.log('[Server]: error (guardar imagen)', err);
                    return res.json({
                        ok: false,
                        message: 'Error al guardar la imagen'
                    })
                }
                borrar_img(pathImgActual)
            })
            medicodb.img = nombreFile
            await medicodb.save()
            break;

        case 'hospitales':
            const hospitaldb = await Hospitales.findById(id)
            if (!hospitaldb) {
                return res.json({
                    ok: true,
                    message: 'El hospital para actualizar la imagen no existe'
                })
            }
            pathImgActual = `./uploads/hospitales/${hospitaldb.img}`
            file.mv(pathImg, (err) => {
                if (err) {
                    console.log('[Server]: error (guardar imagen)', err);
                    return res.json({
                        ok: false,
                        message: 'Error al guardar la imagen'
                    })
                }
                borrar_img(pathImgActual)
            })
            hospitaldb.img = nombreFile
            await hospitaldb.save()
            break;
    }
    return res.json({
        ok: true,
        message: `Se atualizo la imagen en ${tabla}`
    })
}

mostrar_imagen = (req, res = response) => {
    const { tabla, imagen } = req.params
    let pathImg = path.join(__dirname, `../../uploads/${tabla}/${imagen}`)
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg)
    }
    else {
        pathImg = path.join(__dirname, `../../uploads/no_image.png`)
        res.sendFile(pathImg)
    }

}

borrar_img = (path) => {
    //verficar de forma sincrona sis existe 
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}

module.exports = {
    cargar_archivo,
    mostrar_imagen

}