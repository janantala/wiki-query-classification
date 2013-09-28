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
    
    console.log(anchors);

    var keywords = [];
    var count = 0;
    anchors.forEach(function(anchor){
      Classification.searchChildren(anchor.pathname, query, function(err, refs){
        count ++;
        console.log(count + ' / ' + anchors.length);
        if (refs && refs.length) {
          console.log(anchor);
          keywords.push(anchor);
        }

        if (count == anchors.length) {
          res.json(keywords);
        }
      });
    });

  });
  
};

