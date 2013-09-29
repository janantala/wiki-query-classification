
/**
 * Module dependencies.
 */

var env = process.env.ENV || 'development';
var config = require('./config/config')[env];
var express = require('express');
var http = require('http');
var path = require('path');
var ltld = require('local-tld-update');

var app = express();

// express
require('./config/express')(app, config);

// routes
require('./config/routes')(app);

var server = http.createServer(app);
server.listen((config.port || 0), function(){
  console.log('Express server listening on port ' + server.address().port);
  ltld.update(config.app.tld, server.address().port);
});