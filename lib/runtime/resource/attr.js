'use strict';

let _ = require('lodash');
let { Serializable } = require('djantajs-compiler-core');
let { required, fill, annotations } = require('../../utils');

/**
 * Attribute annotation.
 *
 * @type {Attribute}
 */
module.exports = class Attribute extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.attribute.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.attribute.type;
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

  get annotationName() {
    return annotations.resource.attribute.name;
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
    let self = this;

    required('resource/attribute', [
      { value: self.name, name: 'name'}
    ]);

    return fill(self, _.defaults({}), [
      'name', { name: 'defaultValue', alias: 'default' },
      'target', 'description'
    ]);
  }
};
