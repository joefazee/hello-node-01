const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require('../handlers');
const helpers = require('../lib/helpers');


// All the server logic both on http and https
module.exports = function (req, res) {

    // get the url
    var parseUrl = url.parse(req.url, true);

    // get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get query string
    var queryStringObject = parseUrl.query;


    // get the http method
    var method = req.method.toLowerCase();

    // get headers
    var headers = req.headers;

    // get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        // build the handler
        var chosenHandler = typeof (handlers.routers[trimmedPath]) !== 'undefined' ? handlers.routers[trimmedPath] : handlers.notFound;

        // build data to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // call the handler
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log(method + ' /' + trimmedPath );
        

        });

    });

}
