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
        console.log(child);
        return cb ? cb(errors) : cb(true);
      }
      if (!window) {
        return cb ? cb('wikipedia.org connection error') : cb(true);
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
      $('#bodyContent a[href^="/wiki/Portal:"]').remove();
      $('#bodyContent a[href^="/wiki/Wikipedia:"]').remove();

      var anchorsDOM = $.find('#bodyContent a[href^="/wiki/"]');

      var anchors = _.map(anchorsDOM, function(anchor){
        return _.pick(anchor, 'title', 'pathname');
      });

      anchors = _.uniq(anchors, function(anchor){
        return anchor.pathname;
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
        console.log(child);
        return cb ? cb(errors) : cb(true);
      }
      if (!window) {
        return cb ? cb('wikipedia.org connection error') : cb(true);
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
      $('#bodyContent a[href^="/wiki/Portal:"]').remove();
      $('#bodyContent a[href^="/wiki/Wikipedia:"]').remove();

      var anchorsDOM = $.find('#bodyContent a[href^="/wiki/' + parent + '"]');

      var anchors = _.map(anchorsDOM, function(anchor){
        return _.pick(anchor, 'title', 'pathname');
      });

      return cb(null, anchors);
    }
  });
};