'use strict';

var EventHubClient = require('azure-event-hubs').Client,
    config = require('../config'),
    logger = require('../lib').Logger;