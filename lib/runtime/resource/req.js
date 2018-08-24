'use strict';

let { Serializable } = require('djantajs-compiler-core');
let { fill, required, annotations, isSerializable } = require('../../utils');
let _ = require ('lodash');

/**
 * Qualified resource request annotation implementation
 *
 * @type {Request}
 */
module.exports = class Request extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.request.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.request.type;
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
    return annotations.resource.request.name;
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
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get name() {
    return this._verb;
  }

  /**
   * Set the expected api url name
   * @param {string} name the http api verb to set
   */
  set name(name) {
    this._verb = name;
  }

  /**
   * Gets the request acceped content type
   * @return {string} a valid request acceped content type or <code>application/json</code> otherwise.
   */
  get type() {
    return this.value;
  }

  /**
   * Set request acceped content type
   * @param {string} type the request accepted content type
   */
  set type(type) {
    this.value = type;
  }

  /**
   * Gets the request acceped content type
   * @return {string} a valid request acceped content type or <code>application/json</code> otherwise.
   */
  get value() {
    return this._value || 'application/json';
  }

  /**
   * Set request acceped content type
   * @param {string} value the request accepted content type
   */
  set value(value) {
    this._value = value;
  }

  /**
   * Gets the request acceped content type
   * @return {string} a valid request acceped content type or <code>application/json</code> otherwise.
   */
  get headers() {
    return this._headers;
  }

  /**
   * Set request acceped content type
   * @param {string} headers the request accepted content type
   */
  set headers(headers) {
    this._headers = headers;
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

    required('resource/request', [
      { value: self.name, name: 'name' },
      { value: self.type, name: 'type' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'type', 'description', {
        name: 'headers', render: (o, name) => _.reduce(o[name],
          (result, h) => isSerializable(h) ?
            [...result || [], h.serialize] :
            result,
        undefined)
      },
      {
        name: 'responses', render: (o, name) => _.reduce(o[name],
        (result, r) => isSerializable(r) ?
          [...result || [], r.serialize] :
          result,
        undefined)
      }
    ]);
  }
};
