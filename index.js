'use strict';

const Path = require('path');
//const ROOT = Path.resolve(__dirname, './lib/runtime');

module.exports = {
  Handler: require('./lib/rc'),
  ModuleBase: Path.resolve(__dirname, './lib/runtime')
};
