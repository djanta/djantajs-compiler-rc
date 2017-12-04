'use strict';

const { required } = require('../../utils');
const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');
const { isSerializable } = require('../../utils');

const _ = require ('lodash');

const TYPE = 'porte';
const NAME = TYPE;
const TARGETS = [Annotation.DEFINITION];

/**
 * Hook annotation.
 *
 * @type {Porte}
 */
module.exports = class Porte extends Serializable {

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
  init (data) {}

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get name() {
    return this._name;
  }

  /**
   * Gets the component annotated method name
   * @param {string} name the target annotated method name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get enabled() {
    return _.isUndefined(this._enabled)? true: this._enabled;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} enabled the target annotated method name
   */
  set enabled(enabled) {
    this._enabled = enabled;
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
  get migration() {
    return this._migration;
  }

  /**
   * Gets the component annotated method name
   * @param {string} migration the target annotated method name
   */
  set migration(migration) {
    this._migration = migration;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    required('porte', [{value: self.name, key: 'name'}]);

    options.name = self.name;
    options.enabled = self.enabled;

    if(self.description) options.description = self.description;
    if(isSerializable(self.migration)) options.migration = self.migration.serialize;

    return options;
  }
};
