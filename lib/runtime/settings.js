'use strict';

let { Serializable, Annotation } = require('@djanta/djantajs-compiler-core');
let _ = require ('lodash');
let { fill, required, annotations } = require('../utils');

/**
 * Setting annotation class implementation.
 *
 * @type {Setting}
 */
module.exports = class Setting extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets() {
    return annotations.setting.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.setting.type;
  }

  /**
   * Constructor to add attributes
   * @param {Array} data the given annotation unparsing data
   * @param {string} filePath the target annotated class script file
   * @constructor
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  /**
   * Mandatory annotation name property implementation
   * @return {string} Returns the proper annotation given name
   */
  get annotationName() {
    return annotations.setting.name;
  }

  /**
   * Optional initialization method that can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data) {
    // this's just a comment to avoid empty method rule error
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get name() {
    return this._verb;
  }

  /**
   * Gets the component annotated method name
   * @param {string} name the target annotated method name
   */
  set name(name) {
    this._verb = name;
  }

  /**
   * Get the target introspected annotated method value
   * @return {string} the annotated method value
   */
  get value() {
    return this._value || '';
  }

  /**
   * Gets the component annotated method name
   * @param {string} value the target annotated method value
   */
  set value(value) {
    this._value = value;
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
    let self = this;
    required('settings', [{ value: self.name, key: 'name' }]);

    // fill out the redering context
    return fill(self, {}, ['name', 'value', 'description']);

    /* options.name = self.name;
    if (self.value) { options.value = self.value; }
    if (self.description) { options.description = self.description; }
    return options;
    */
  }
};
