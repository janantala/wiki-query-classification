var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(process.cwd() + '/lib/jquery.js', 'utf-8');

module.exports.searchAnchors = function(query, cb){
  jsdom.env({
    url: 'http://en.wikipedia.org/wiki/' + query,
    src: [jquery],
    done: function (errors, window) {
      if (errors) {
        console.log(errors);
        return cb ? cb(errors) : false;
      }
      if (!window) {
        return cb ? cb(new error.HttpResponseError('wikipedia.org connection error')) : false;
      }

      var $ = window.$;
      var anchorsDOM = $.find('#bodyContent a');

      var anchors = [];
      anchorsDOM.forEach(function(anchor){
        if (anchor.title && (/\/wiki\//gi.test(anchor.pathname))) {
          anchors.push({
            'title': anchor.title,
            'pathname': anchor.pathname
          });
        }
        
      });


      return cb(null, anchors);
    }
  });
};

module.exports.searchChildren = function(child, parent, cb){
  console.log(child);
  jsdom.env({
    url: 'http://en.wikipedia.org' + child,
    src: [jquery],
    done: function (errors, window) {
      if (errors) {
        console.log(errors);
        return cb ? cb(errors) : false;
      }
      if (!window) {
        return cb ? cb(new error.HttpResponseError('wikipedia.org connection error')) : false;
      }

      var $ = window.$;
      var anchorsDOM = $.find('#bodyContent a[href="/wiki/' + parent + '"]');

      var anchors = [];
      anchorsDOM.forEach(function(anchor){
        if (anchor.title && (/\/wiki\//gi.test(anchor.pathname))) {
          anchors.push({
            'title': anchor.title,
            'pathname': anchor.pathname
          });
        }
        
      });

      return cb(null, anchors);
    }
  });
};