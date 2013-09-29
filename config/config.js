var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'localhost/wiki-dev',
    port: 3005,
    root: rootPath,
    app: {
        name: 'Wiki - Development',
        tld: 'wiki'
    },
  },
  test: {
    db: 'localhost/wiki-test',
    port: 3005,
    root: rootPath,
    app: {
        name: 'Wiki - Test',
        tld: 'wiki'
    },
  },
  production: {
    db: 'localhost/wiki',
    port: 3005,
    root: rootPath,
    app: {
        name: 'Wiki - Production',
        tld: 'wiki'
    },
  }
};