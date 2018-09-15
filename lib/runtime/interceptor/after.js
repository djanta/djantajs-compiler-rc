'use strict';

let { Serializable } = require('@djanta/djantajs-compiler-core');
let { fill, annotations } = require('../../utils');
let _ = require('lodash');

/**
 * Interceptor annotation implementation class
 * @type {After}
 */
module.exports = class After extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets() {
    return annotations.interceptor.after.target;
  }

  /**
   * The possible annotation name.
   * @type {string}
   * @return {string} Returns the annotation type
   */
  static get annotation() {
    return annotations.interceptor.after.type;
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
   * @return {string} Returns the annotation name
   */
  get annotationName () {
    return annotations.interceptor.after.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
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

    return fill(self, _.defaults({}), [
      'description', 'handler', 'options'
    ]);
  }
};
