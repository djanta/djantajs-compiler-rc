'use strict';

const Path = require('path');

module.exports = {
  Handler: require('./lib/rc'),
  ModuleBase: Path.resolve(__dirname, './lib/runtime')
};
