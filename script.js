// Fecha
const date = () => {
  const f = new Date()
  const ceroParaMes = f.getMonth() + 1 < 10 ? '0' : ''
  const ceroParaDia = f.getDate() < 10 ? '0' : ''
  const fecha =
    ceroParaDia +
    f.getDate() +
    '/' +
    ceroParaMes +
    (f.getMonth() + 1) +
    '/' +
    f.getFullYear()
  return fecha
}
// Fin fecha
// Paso 1
const http = require('http')
// Paso 2
const url = require('url')
// Paso 3
const fs = require('fs')
// Paso 4
http
  .createServer(function (req, res) {
    // Paso 5
    const params = url.parse(req.url, true).query
    const nombre = params.archivo
    const contenido = params.contenido
    const nuevoNombre = params.nuevo_nombre
    // Paso 6
    if (req.url.includes('/crear')) {
      fs.writeFile(nombre, ` ${date()} \n ${contenido}`, () => {
        res.write('Archivo creado con exito!')
        res.end()
      })
    }
    // Paso 7
    if (req.url.includes('/leer')) {
      fs.readFile(nombre, (err, data) => {
        if (err) {
          res.write('error al leer el archivo')
          res.end()
        } else {
          res.write(data)
          res.end()
        }
      })
    }
    // Paso 1
    if (req.url.includes('/renombrar')) {
      fs.rename(`${nombre}`, nuevoNombre, (err, data) => {
        if (err) {
          res.write('error al renombrar el archivo')
          res.end()
        } else {
          res.write(`Archivo ${nombre}  renombrado por ${nuevoNombre}`)
          res.end()
        }
      })
    }
    // Paso 2
    if (req.url.includes('/eliminar')) {
      fs.unlink(nombre, (err, data) => {
        if (err) {
          res.write('error al eliminar el archivo')
          res.end()
        } else {
          res.write(
            `Tu solicitud para eliminar el archivo ${nombre} se esta procesando... \n`
          )
          setTimeout(() => {
            res.write('Exito se ha elimiando el archivo')
            res.end()
          }, 3000)
        }
      })
    }
  })
  .listen(8080, () => console.log('Escuchando el puerto 8080'))
