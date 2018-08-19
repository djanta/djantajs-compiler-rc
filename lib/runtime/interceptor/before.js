'use strict';

let { Annotation, Serializable } = require('djantajs-compiler-core');
let { fill, annotations } = require('../../utils');

/**
 * Interceptor before lifecycle annotation implementation.
 * @type {Before}
 */
module.exports = class Before extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets () {
    return annotations.interceptor.before.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.interceptor.before.type;
  }

  /**
   * Constructor to add attributes.
   * @param {*} data before annotation data
   * @param {string} filePath annotation script file
   * @constructor
   */
  constructor (data, filePath) {
    super(data, filePath)
  }

  /**
   * Gets the annotation given name.
   * @return {string} Returns the annotation name
   */
  get annotationName () {
    return annotations.interceptor.before.name;
  }

  /**
   * Optional initialization method that can be used to transform data
   *
   * @param  {Object} data the configuration extra data
   * @return {void} Returns <code>void</code>
   */
  init (data) {}

  /**
   * Gets the controller handlable method name
   * @return {string} a valid annotated method name
   */
  get handler() {
    return this.target || 'toString';
  }

  /**
   * Set the current controller handlable method name
   * @param {string} handler the handlable method name
   */
  set handler(handler) {
    this.target = handler || 'toString';
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get target() {
    return this._target;
  }

  /**
   * Gets the component annotated method name
   * @param {string} target the target annotated method name
   */
  set target(target) {
    this._target = target;
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
   * Get the interceptor environment setting name
   * @return {string} the target environment setting name
   */
  get options() {
    return this._options;
  }

  /**
   * Gets the interceptor default invocation configuration
   * @param {string} options the interceptor default invocation configuration
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this;
    return fill(self, {}, ['description', 'handler', 'options']);
  }
};
