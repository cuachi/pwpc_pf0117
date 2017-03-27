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
                    res.write(`<link rel="stylesheet" href="vendor/bootstrap/dist/css/bootstrap.css">
                        <link rel="stylesheet" href="css/site.css">`);
            res.end(`<div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                    <svg class="svg-box" width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                        <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#3bafda" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#7266ba" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#f76397" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#00b19d" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#ffaa00" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="col-sm-6">
                                <div class="message-box">
                                    <h1 class="m-b-0">500</h1>
                                    <p>Lo sentimos tuvimos un error </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`, 'utf-8');
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
            res.write(`<link rel="stylesheet" href="vendor/bootstrap/dist/css/bootstrap.css">
                        <link rel="stylesheet" href="css/site.css">`);
            res.end(`<div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                    <svg class="svg-box" width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                        <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#3bafda" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#7266ba" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#f76397" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#00b19d" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                        <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#ffaa00" stroke-width="6" sketch:type="MSShapeGroup"></path>
                                    </g>
                                </svg>
                            </div>
                            
                            <div class="col-sm-6">
                                <div class="message-box">
                                    <h1 class="m-b-0">404</h1>
                                    <p>Lo sentimos no encontramos la pagina</p>
                                    <div class="buttons-con">
                                        <div class="action-link-wrap">
                                            <a href="index.html" class="btn btn-custom btn-primary waves-effect waves-light m-t-20">ir a la pagina principal</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`, 'utf-8');
        }
    });
}