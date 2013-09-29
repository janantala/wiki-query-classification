var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(process.cwd() + '/lib/jquery.js', 'utf-8');
var _ = require('underscore');

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

      $('#bodyContent').find('.navbox').remove();
      $('#bodyContent').find('.metadata').remove();
      $('#bodyContent').find('.catlinks').remove();
      $('#bodyContent').find('.toc').remove();
      $('#bodyContent').find('a.image,a.internal').remove();
      $('#bodyContent').find('.reflist').remove();

      $('#bodyContent a[href^="/wiki/Help:"]').remove();
      $('#bodyContent a[href^="/wiki/Special:"]').remove();

      var anchorsDOM = $.find('#bodyContent a[href^="/wiki/"]');

      var anchors = _.map(anchorsDOM, function(anchor) { return _.pick(anchor, 'title', 'pathname'); });
      console.log(anchors);
      console.log(anchors.length);

      // TODO filter duplicates

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
      $('#bodyContent').find('.navbox').remove();
      $('#bodyContent').find('.metadata').remove();
      $('#bodyContent').find('.catlinks').remove();
      $('#bodyContent').find('.toc').remove();
      $('#bodyContent').find('a.image,a.internal').remove();

      var anchorsDOM = $.find('#bodyContent a[href^="/wiki/' + parent + '"]');

      var anchors = [];
      anchorsDOM.forEach(function(anchor){
        if (anchor.title) {
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