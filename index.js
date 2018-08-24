'use strict';

const Path = require('path');

module.exports = {
  Handler: require('./lib/rcompiler'),
  ModuleBase: Path.resolve(__dirname, './lib/runtime')
};
