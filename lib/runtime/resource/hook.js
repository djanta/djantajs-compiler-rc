'use strict';

let { Annotation, Serializable } = require('djantajs-compiler-core');
let _ = require ('lodash');

let TYPE = 'hook';
let NAME = TYPE;
let TARGETS = [Annotation.METHOD, Annotation.DEFINITION];

/**
 * Hook annotation.
 *
 * @type {Hook}
 */
module.exports = class Hook extends Serializable {

  /**
   * The possible targets
   *
   * (Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets() {
    return TARGETS;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return TYPE;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor (data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return NAME;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data) {}

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
    return this._options || true;
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

    if(_.isUndefined(self.interceptor) || _.isEmpty(self.interceptor) || _.isNull(self.interceptor))
        throw new Error('Unexpected invalid hook name at propterty "name"');

    options.interceptor = self.interceptor;
    options.enabled = self.enabled;

    if (self.description) options.description = self.description;
    if (self.options) options.options = self.options;

    return options;
  }
};
