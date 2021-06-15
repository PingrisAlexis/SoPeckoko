//Import package http (https needs SSL certificate with domain).
const http = require('http');
const app = require('./app');

//normalizePort function returns a valid port, either as a number or as a string.
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// if process.env.PORT is not available then we use port 3000.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


//errorHandler function searches for the different errors and handles them appropriately.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':          //Permission denied.
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':      //Port already in use.
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Create a server with express that uses app, and create a constant for server calls (requests and responses).
const server = http.createServer(app);


//Launch server, and listen if there are errors.
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// The server listens to the port defined above.
server.listen(port);
