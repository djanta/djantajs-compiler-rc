'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const TYPE = 'attribute';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * Attribute annotation.
 *
 * @type {Attribute}
 */
module.exports = class Attribute extends Serializable {

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
  constructor(data, filePath) {
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
   * Sets the component annotated method interceptor
   * @param {string} name the target annotated method interceptor
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Gets the data model attribute that's required by the request attribute
   * @return {string} the data model attribute that's required by the request attribute
   */
  get name() {
    return this._name;
  }

  /**
   * Gets the data model attribute that's required by the request attribute default value.
   * @return {string} the data model attribute that's required by the request attribute default value.
   */
  get defaultValue() {
    return this._default;
  }

  /**
   * Sets the component annotated method interceptor
   * @param {string} default_ the target annotated method interceptor
   */
  set defaultValue(default_) {
    this._default = default_;
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
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};
    return options;
  }
};
