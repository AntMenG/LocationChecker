const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'locationchecker'
    },
    port: process.env.PORT || 3000,
    db: {db: 'locationchecker_development'}
  },

  test: {
    root: rootPath,
    app: {
      name: 'locationchecker'
    },
    port: process.env.PORT || 3000,
    db: {db: 'locationchecker_test'}
  },

  production: {
    root: rootPath,
    app: {
      name: 'locationchecker'
    },
    port: process.env.PORT || 3000,
    db: {db: 'locationchecker_production'}
  }
};

module.exports = config[env];
