'use strict';

const Path = require('path');
const cloader = require;

/**
 * Export the bundle external resource needed
 * @type {{Handler: RuntimeCompiler, ModuleBase: *}}
 */
module.exports = {
  /**
   * Gets the base module handler
   * @return {RuntimeCompiler} Returns the base compiler handler
   */
  Handler: cloader('./lib/rcompiler'),
  /**
   * Gets the base module annotation path.
   * @return {string|File} Returns the module base annotation path.
   */
  ModuleBase: Path.resolve(__dirname, './lib/runtime')
};
