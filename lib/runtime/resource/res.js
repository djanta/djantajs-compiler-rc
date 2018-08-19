'use strict';

let { Serializable } = require('djantajs-compiler-core');
let { required, fill, isSerializable, annotations} = require('../../utils');
let _ = require ('lodash');

/**
 * @type {Response}
 */
module.exports = class Response extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.response.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.response.type;
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
    return annotations.resource.response.name;
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
   * Gets responde expected code value
   * @return {number} a valid http verb
   */
  get code() {
    return this._code;
  }

  /**
   * Set the expected request response code
   * @param {number} code the expected response code value otherwise <code>200</code> by default
   */
  set code(code) {
    this._code = code;
  }

  /**
   * Gets the response acceped content type
   * @return {string} a valid request acceped content type or <code>application/json</code> otherwise.
   */
  get type() {
    return this._type || 'application/json';
  }

  /**
   * Set response acceped content type
   * @param {string} type the request accepted content type
   */
  set type(type) {
    this._type = type;
  }

  /**
   * Gets the response acceped headers
   * @return {Header} a valid request acceped headers or
   *  <code>empty array</code> otherwise.
   */
  get headers() {
    return this._headers || [];
  }

  /**
   * Set response acceped headers
   * @param {Header} headers the request accepted headers
   */
  set headers(headers) {
    this._headers = headers;
  }

  /**
   * Gets whether the model schema should be shown
   * @return {boolean} might return <code>true</code> while the controller
   *  data model schema should be rendered or <code>false</code> otherwise.
   */
  get showJsonSchema() {
    return this._showJsonSchema || true;
  }

  /**
   * Set whether the model schema should be shown
   * @param {boolean} showJsonSchema set whether the model schema should
   *  be shown.
   */
  set showJsonSchema(showJsonSchema) {
    this._showJsonSchema = showJsonSchema;
  }

  /**
   * Gets whether the model schema should be shown
   * @return {boolean} might return <code>true</code> while the controller
   * data model schema should be rendered or <code>false</code> otherwise.
   */
  get showJsonSample() {
    return this._showJsonSample || true;
  }

  /**
   * Set whether the model sample should be rendered
   * @param {boolean} _showJsonSample set whether the model sample should
   *  be rendered.
   */
  set showJsonSample(_showJsonSample) {
    this._showJsonSample = _showJsonSample;
  }

  /**
   * Gets the url description which will be use to generate the blueprint
   * documentation.
   *
   * @return {string} a valid resource url documentation or
   *  undefiined otherwise.
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
    let self = this, options = {};

    required('resource/response', [
      { value: self.type, name: 'type'},
      { value: self.code, name: 'code'}
    ]);

    return fill(self, _.defaults({}), [
      'code', 'type', 'description', {
        name: 'headers', render: (o, name) => _.reduce(o[name],
          (result, h) => isSerializable(h) ?
            [...result || [], h.serialize] :
            result,
          undefined)
      }
    ]);
  }
};
