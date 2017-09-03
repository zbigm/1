#!/usr/bin/env node

var app = require('./app');
var http = require('http');

// port
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

// http server
var httpServer = http.createServer(app)

// listen
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) { return val; }  // named pipe
    if (port >= 0) { return port; } // port number
    return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log('http server listening on ' + bind);

}