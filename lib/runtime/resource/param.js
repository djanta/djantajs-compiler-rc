'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');
const UrlPattern = require ('url-pattern');

const TYPE = 'param';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * @type {Param}
 */
module.exports = class Param extends Serializable {

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

  static parse (value) {
    let pattern = new UrlPattern(value), attributes = [], values = {url: value};
    (pattern.names || []).forEach((name) => {
      attributes.push({
        'name': name,
        require: true,
        type: 'string',
        description: 'No documentation available'
      });
    });

    if (attributes.length > 0) values.attributes = attributes;

    return values;
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
  init (data){}

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
   * Gets the default expected parameter value
   * @return {Array} a valid the default expected value
   */
  get values() {
    return this._values || [];
  }

  /**
   * Set the default expected parameter value
   * @param {Array} values the default expected value
   */
  set values(values) {
    this._values = values;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name))
        throw new Error('Unexpected invalid parameter value at propterty "name"');

    options.name = self.name;
    options.require = self.require;
    options.type = self.type;
    if(self.default) options.default = self.default;
    if(self.regex) options.regex = self.regex;
    if(self.description) options.description = self.description;

    return options;
  }
};
