'use strict';
console.log(process.version);

const app = require('./app')();

require('./lib').processStart();

app.start();
