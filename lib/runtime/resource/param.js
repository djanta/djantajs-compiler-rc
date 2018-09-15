'use strict';

let { Serializable } = require('@djanta/djantajs-compiler-core');
let { fill, required, annotations } = require('../../utils');

let _ = require ('lodash');
// let UrlPattern = require ('url-pattern');

/**
 * @type {Param}
 */
module.exports = class Param extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.param.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.param.type;
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
    return annotations.resource.param.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data){
    // NYI
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get name() {
    return this._name;
  }

  /**
   * Set the expected api url name
   * @param {string} name the http api verb to set
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Set whether the parameter/attribute is required or not
   * @return {boolean} a valid boolean value of parameter/attribute requiment
   */
  get require() {
    return this._require || true;
  }

  /**
   * Set whether the parameter/attribute is required or not
   * @param {boolean} require define whether the parameter/attribute is required
   */
  set require(require) {
    this._require = require;
  }

  /**
   * Gets the parameter/attibute value type or <code>string</code> by default
   * @return {string} a valid date type of the given parameter/attribute type.
   */
  get type() {
    return this._type || 'string';
  }

  /**
   * Sets the parameter/attibute value type or <code>string</code> by default
   * @param {string} type a valid date type of the given parameter/attribute type.
   */
  set type(type) {
    this._type = type;
  }

  /**
   * Gets the default expected parameter value
   * @return {string|number|boolean} a valid the default expected value
   */
  get default() {
    return this._default;
  }

  /**
   * Set the default expected parameter value
   * @param {string|number|boolean} default_ the default expected value
   */
  set default(default_) {
    this._default = default_;
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get regex() {
    return this._regex;
  }

  /**
   * Set the expected api url name
   * @param {string} regex the http api verb to set
   */
  set regex(regex) {
    this._regex = regex;
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get oid() {
    return this._oid || false;
  }

  /**
   * Set whether the given parameter should be used as an object uniq identifier
   * @param {string} oid the http api verb to set
   */
  set oid(oid) {
    this._oid = oid;
  }

  /**
   * Gets the url description which will be use to generate the blueprint documentation
   * @return {string} a valid resource url documentation or undefiined otherwise.
   */
  get description() {
    return this._description;
  }

  /**
   * Set the api url documentation
   * @param {string} description the documentation api documentation
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

    required('resource/param', [
      { value: self.name, name: 'name' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'require', 'oid', 'type', 'default', 'regex', 'description'
    ]);
  }
};
