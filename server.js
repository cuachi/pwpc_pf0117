const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const mime = require('mime');

const config = require('./config/config');

colors.setTheme(config.color_theme);

var server = http.createServer(function(req,res){
    console.log(`> Peticion entrante: ${req.url}`);
    var resourcePath;
    if(req.url == "/"){
        resourcePath = 'static/index.html';
    }else{
        resourcePath = config.STATIC_PATH + req.url;
    }

    var extName = path.extname(resourcePath);

    var contentType = mime.lookup(extName);

    fs.exists(resourcePath,function(exists){
        if(exists){
            console.log("> El recurso existe...".info);
            fs.readFile(resourcePath,function(err,content){
                if(err){
                    console.log("> Error en la lectura de recurso".error);
                    res.writeHead(500,{
                        'content-Type':'text/html',
                    });
                    res.end('<h1>500: Error interno</h1>');
                }else{
                    console.log(`> Se despacha recurso: ${resourcePath}`.info);
                    res.writeHead(200,{
                        'content-Type': contentType,
                        'Server': 'ITGAM@0.0.1'
                    });
                    res.end(content,'utf-8');
                }
            });
        }else{
            console.log("> El recurso solicitado no fue encontrado...".info);
            res.writeHead(404,{
                'content-Type' : contentType,
                'server' : 'ITGAM@0.0.1'
            });
            res.end('<h1> 404: Not Found</h1>');
        }
    });
});

server.listen(config.PORT,config.IP,function(){
    console.log(`> Server escuchando en http://${config.IP}:${config.PORT}`.info);
})