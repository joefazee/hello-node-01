const helloController = require('./controllers/hello');


// define handlers
var handlers = {
    hello: helloController,
    notFound: (data, callback) => {
        callback(404, {'Error': 'Rount not found'})
    }
};



// define a request router
handlers.routers = {
    'hello': handlers.hello,
}

module.exports = handlers;
