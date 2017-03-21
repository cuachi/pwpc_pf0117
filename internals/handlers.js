var author = {
    "name" : "Aldair Garfias",
    "deparment" : "Computers and Systems",
    "university" : "TecNM - ITGAM" 
};

var getauthorinfo = function(req, res) {

    res.writeHead(200,{
        "Content-Type" : "application/json"
    });
    var jsonResponse = JSON.stringify(author);
    res.end(jsonResponse);
}

var getServerName = function(req, res) {
    console.log("> Respondiendo el nombre del servidor...");
    res.end(`Servidor Halcones peregrinos`);
}

var handlers = {};

handlers["/getauthorinfo"] = getauthorinfo;
handlers["/getServerName"] = getServerName;
module.exports = handlers;