'use strict';

const Path = require('path');

/**
 * Export the bundle external resource needed
 * @type {{Handler: RuntimeCompiler, ModuleBase: *}}
 */
module.exports = {
  Handler: require('./lib/rcompiler'),
  ModuleBase: Path.resolve(__dirname, './lib/runtime')
};
