'use strict';

let { Serializable, Annotation} = require('djantajs-compiler-core');
let { isSerializable, annotations, fill, required } = require('../../utils');
let _ = require ('lodash');

/**
 * Hook annotation.
 *
 * @type {Porte}
 */
module.exports = class Porte extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.plugin.porte.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.plugin.porte.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor (data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.plugin.porte.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init (data) {
    // NYI
  }

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
    let self = this;

    required('plugin/porte', [
      { value: self.name, name: 'name' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'enabled', 'description',
      {
        name: 'migration', render: (o, name) => isSerializable(o[name]) ?
        o[name].serialize : void undefined
      }
    ]);
  }
};
