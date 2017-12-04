'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');

const TYPE = 'setting';
const NAME = TYPE;
const TARGETS = [Annotation.DEFINITION];

/**
 * Hook annotation.
 *
 * @type {Setting}
 */
module.exports = class Setting extends Serializable {

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
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name))
        throw new Error('Unexpected invalid setting value at propterty "name"');

    options.name = self.name;

    if(self.value) options.value = self.value;
    if(self.description) options.description = self.description;

    return options;
  }
};
