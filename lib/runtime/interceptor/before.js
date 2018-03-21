'use strict';

const { Annotation } = require('djantajs-compiler-core');
const { Serializable } = require('djantajs-compiler-core');

const TYPE = 'before';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * @type {Before}
 */
module.exports = class Before extends Serializable {

  /**
   * The possible targets
   *
   * (Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets () {
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

  get annotationName () {
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
    let self = this, options = {};

    if (self.description) options.description = self.description;
    if (self.handler) options.handler = self.handler;
    if (self.options) options.options = self.options;

    return options;
  }
};