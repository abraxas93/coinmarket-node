'use strict';
console.log(process.version);

const CoinMarketCap = require("node-coinmarketcap"),     
    logger = require('./lib').Logger,
    moment = require('moment');

require('./lib').processStart();

let options = {
   events: true, // Enable event system
   refresh: 60, // Refresh time in seconds (Default: 60)
   convert: "EUR" // Convert price to different currencies. (Default USD)
}, i = 0;

const coinmarketcap = new CoinMarketCap(options);

setInterval(() => {
    coinmarketcap.getTop(50, sendToHub);
    console.log('#iteration: ' + i);
    i++;
}, 60000);



function sendToHub(dataArr) {
    dataArr.forEach(element => {
        element.last_updated = moment(element.last_updated*1000).format("YYYY-MM-DD HH:mm:ss");
        console.log(element);
    });
}