'use strict';

const CoinMarketCap = require("node-coinmarketcap"),
    logger = require('./lib').Logger,
    ehub = require('./ehub'),
    moment = require('moment');

let Application = function() {
    let timeout = 60000, // request time period
        timerId = null; 

    let options = {
        events: true, // Enable event system
        refresh: 60, // Refresh time in seconds (Default: 60)
        convert: "EUR" // Convert price to different currencies. (Default USD)
    };
    let coinmarketcap = new CoinMarketCap(options),
        i = 0; 

    let sendToHub = dataArr => {
        dataArr.forEach(element => {
            element.last_updated = moment(element.last_updated*1000).format("YYYY-MM-DD HH:mm:ss");
            ehub.send(element);
        });
    }
    
    let start = () => {
        timerId = setInterval(() => {
            coinmarketcap.getTop(50, sendToHub);
            console.log('#iteration: ' + i);
            i++;
        }, timeout);
    }

    let stop = () => {
        clearInterval(timerId);
    }
    return {
        start,
        stop
    };
}

module.exports = Application