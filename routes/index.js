var ejs = require('ejs');
var error = require('../lib/error');
var _ = require('underscore');

var requests = [];

exports.index = function(req, res){
  res.render('index');
};

exports.classify = function(req, res){
  res.json({});
};

