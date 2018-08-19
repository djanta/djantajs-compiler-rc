'use strict';

let { Serializable } = require('djantajs-compiler-core');
let { required, fill, isSerializable, annotations } = require('../../utils');
let _ = require ('lodash');

/**
 * @type {Header}
 */
module.exports = class Header extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets () {
    return annotations.resource.header.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.header.type;
  }

  /**
   * Constructor to add attributes
   * @param {Array} data the given annotation unparsing data
   * @param {string} filePath the target annotated class script file
   * @constructor
   */
  constructor(data, filePath){
    super(data, filePath)
  }

  get annotationName() {
    return annotations.resource.header.name;
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
   * Gets the controller expected header name
   * @return {Array} a valid request expected header name
   */
  get name() {
    return this._name || [];
  }

  /**
   * Set the request expected header name
   * @param {Array} name a valid expected request header name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get value() {
    return this._value;
  }

  /**
   * Set the expected api url value
   * @param {string} value the http url value
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    required('resource/header', [
      { value: self.name, name: 'name' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'validator', { name: 'value', alias: 'default' }
    ]);
  }
};
