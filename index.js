'use strict';

let server = require('./server');
let port = 8020;

server.listen(port, () => {
  console.log('Express.js server running on port %d', port);
});