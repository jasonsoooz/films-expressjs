'use strict';

const server = require('./server');
const port = 8020;

server.listen(port, () => {
  console.log('Express.js server running on port %d', port);
});