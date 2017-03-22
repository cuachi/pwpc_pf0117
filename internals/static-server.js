const fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    config = require('../config/config');

exports.server = function(req, res) {
    var resourcePath = config.STATIC_PATH + req.url;
    if (req.url == "/") {
        resourcePath = 'static/index.html';
    } else {
        resourcePath = path.resolve(resourcePath);
    }
    console.log(`Recurso solicitado: ${resourcePath}`.data);
    var extName = path.extname(resourcePath);

    var contentType = mime.lookup(extName);

    fs.exists(resourcePath, function(exists) {
        if (exists) {
            console.log("> El recurso existe...".info);
            fs.readFile(resourcePath, function(err, content) {
                if (err) {
                    resourcePath = 'static/500.html';
                    console.log("> Error en la lectura de recurso".error);
                    res.writeHead(500, {
                        'content-Type': 'text/html',
                    });
                    res.write('<link rel="stylesheet" href="css/site.css">');
            res.end('<div class="dialog"><div><h1>Lo sentimos pero algo salio mal.</h1></div><p>Si eres el due&ntildeo del servidor revisa el log.</p></div>', 'utf-8');
                } else {
                    console.log(`> Se despacha recurso: ${resourcePath}`.info);
                    res.writeHead(200, {
                        'content-Type': contentType,
                        'Server': 'ITGAM@0.0.1'
                    });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            console.log("> El recurso solicitado no fue encontrado...".info);
            res.writeHead(404, {
                'content-Type': contentType,
                'server': 'ITGAM@0.0.1'
            });
            res.write('<link rel="stylesheet" href="css/site.css">');
            res.end('<div class="dialog"><div><h1>La url que buscas no existe.</h1><p>Posiblemente sea un error de escritura en la direcci&oacuten o fue movido</p></div><p>Si eres el due&ntildeo del servidor revisa el log.</p></div>', 'utf-8');
        }
    });
}