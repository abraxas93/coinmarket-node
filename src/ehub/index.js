'use strict';

const EventHubClient = require('azure-event-hubs').Client,
    config = require('../config'),
    logger = require('../lib').Logger;  
    
let sender = {};
let client = EventHubClient.fromConnectionString(config.CON_SRING_PRIMARY_KEY, 'hub4')
client.open()
    .then(function () {
        sender = client.createSender('0');
        return sender;
    })
    .then(function (tx) {
        tx.on('errorReceived', function (err) { console.log(err); });
        return tx;
    });


let send = function(event) {
    senders.hub1Client.then(tx => {
        tx.send({
            contents: event
        });
    });
};

module.exports = {
    send
}