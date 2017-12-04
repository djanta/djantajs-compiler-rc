'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');

const TYPE = 'request';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

module.exports = class Request extends Serializable {

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
  constructor(data, filePath){
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
    return this._type || 'application/json';
  }

  /**
   * Set request acceped content type
   * @param {string} type the request accepted content type
   */
  set type(type) {
    this._type = type;
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
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name))
      throw new Error('Unexpected invalid request value at propterty "name"');

    if(_.isUndefined(self.type) || _.isEmpty(self.type) || _.isNull(self.type))
      throw new Error('Unexpected invalid request value at propterty "type"');

    options.name = self.name;
    options.type = self.type;

    if (self.description) options.description = self.description;

    let headers = self.headers;
    if (headers && 0 !== headers.length) {
      let hdrs = [];
      headers.forEach((header) => {
        if (header && header.hasOwnProperty('serialize')) hdrs.push(header.serialize);
      });
      options.headers = (0 !== hdrs.length)? hdrs: undefined;
    }

    let responses = self.responses;
    if (responses && 0 !== responses.length) {
      let hdrs = [];
      responses.forEach((response) => {
        if (response && response.hasOwnProperty('serialize')) hdrs.push(response.serialize);
      });
      options.responses = (0 !== hdrs.length)? hdrs: undefined;
    }

    return options;
  }
};
