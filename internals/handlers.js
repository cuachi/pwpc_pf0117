var author = {
    "name" : "Aldair Garfias",
    "deparment" : "Computers and Systems",
    "university" : "TecNM - ITGAM" 
};

var getservertime = function(req, res){
    res.writeHead(200,{
        "Content-Type" : "text/html"
    });
    var date = new Date();
    var horas = date.getHours();
    var minutos = date.getMinutes();
    var segundos = date.getSeconds();
    if (horas <= 24 && horas <= 12 ) {
        res.write('<img src="http://127.0.0.1:3000/img/amanecer.png" width=100 heigth=100> </img>');
        res.end(`<h1>Buenos dias a hora del server es: ${horas}:${minutos}:${segundos}</h1>`);
    } else if(horas > 12 && horas <= 18){
        res.write('<img src="http://127.0.0.1:3000/img/atardecer.jpg" width=100 heigth=100> </img>');
        res.end(`<h1>Buenas tardes la hora del server es: ${horas}:${minutos}:${segundos}</h1>`);
    }else{
        res.write('<img src="http://127.0.0.1:3000/img/amanecer.png" width=100 heigth=100> </img>');
        res.end(`<h1>Buenas noches la hora del server es: ${horas}:${minutos}:${segundos}</h1>`);
    }
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
handlers["/getservertime"] = getservertime;
module.exports = handlers;