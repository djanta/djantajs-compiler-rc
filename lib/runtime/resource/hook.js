'use strict';

let { Serializable } = require('djantajs-compiler-core');
let _ = require ('lodash');
let { required, fill, annotations } = require('../../utils');

/**
 * Hook annotation.
 *
 * @type {Hook}
 */
module.exports = class Hook extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.hook.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.hook.type;
  }

  /**
   * Constructor to add attributes
   * @param {Array} data the given annotation unparsing data
   * @param {string} filePath the target annotated class script file
   * @constructor
   */
  constructor (data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.resource.hook.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data) {
    // NYI
  }

  /**
   * Gets the component annotated method interceptor
   * @param {string} interceptor the target annotated method interceptor
   */
  set interceptor(interceptor) {
    this._interceptor = interceptor;
  }

  /**
   * Get the target introspected annotated method interceptor
   * @return {string} the annotated method interceptor
   */
  get interceptor() {
    return this._interceptor;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get enabled() {
    return this._enabled || true;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} enabled the target annotated method name
   */
  set enabled(enabled) {
    this._enabled = enabled;
  }

  /**
   * Get the target introspector configuration options
   * @return {Object} the hook configuration options
   */
  get options() {
    return this._options || void undefined;
  }

  /**
   * Gets the interceptor configuration options
   * @param {Object} options the target interceptor invocation options
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get description() {
    return this._description;
  }

  /**
   * Gets the component annotated method name
   * @param {string} description the target annotated method name
   */
  set description(description) {
    this._description = description;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    required('resource/hook', [
      { value: self.interceptor, name: 'interceptor' }
    ]);

    return fill(self, _.defaults({}), [
      'interceptor', 'enabled', 'options', 'description'
    ]);
  }
};
