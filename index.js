const http = require('http');
var config = require('./config');
const unifiedServer  = require('./lib/server');


// Instantiate the HTTP Server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
});

httpServer.listen(config.httpPort, function(){
    console.log('Listening on port ' + config.httpPort);
});

