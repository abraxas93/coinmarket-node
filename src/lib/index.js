'use strict';

const winston = require('winston');

let Logger = new (winston.Logger)({
    transports: [       
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'errors.log',
            level: 'error'
        })
    ]
});

winston.handleExceptions(new winston.transports.File({ filename: 'errors.log' }));

// starts process
let processStart = () => {
    let date = new Date().toUTCString();
    console.log(`Process started at ${date} on Node version: ${process.version}`);
};

module.exports = {
    Logger,  
    processStart
};