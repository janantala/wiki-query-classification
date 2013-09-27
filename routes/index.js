var ejs = require('ejs');
var error = require('../lib/error');
var Classification = require('../models/Classification');
var _ = require('underscore');

var requests = [];

exports.index = function(req, res){
  res.render('index');
};

exports.classify = function(req, res){

  var query = req.params.query;
  Classification.searchAnchors(query, function(err, anchors){
    res.json(anchors);
  });
  
};

