'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');
const UrlPattern = require ('url-pattern');
const Param = require ('./param');

const TYPE = 'url';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * @type {Url}
 */
module.exports = class Url extends Serializable {

  /**
   * The possible targets
   *
   * (Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets () {
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
    let pattern = new UrlPattern(value),
      attributes = [], values = {url: value};

    (pattern.names || []).forEach((name) => {
      attributes.push({'name': name, require: true, type: 'string', description: 'No documentation available'});
    });

    if (attributes.length > 0) values.attributes = attributes;

    return values;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor (data, filePath){
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
  init(data) {
    //this._name = data.value || undefined;
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
   * Gets the controller expected urls
   * @return {Array} a valid request expected urls or undefined otherwise
   */
  get params() {
    return this._params;
  }

  /**
   * Set the request expected urls
   * @param {Array} params a valid expected request urls
   */
  set params(params) {
    this._params = params;
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

    if(_.isUndefined(self.value) || _.isEmpty(self.value) || _.isNull(self.value))
      throw new Error('Unexpected invalid url value at propterty "value"');

    options.url = self.value;
    let params = self.params;
    if (params && _.isArray(params) && 0 !== params.length) {
      options.params = [];
      params.forEach((param) => {
        if (param.serialize) options.params.push(param.serialize);
        else options.params.push(param);
      });
    }
    else {
      let names = new UrlPattern(self.value).names || [];
      if (0 !== names) {
        options.params = [];
        names.forEach((name) => {
          let param = new Param();
          param.name = name;
          options.params.push(param.serialize);
        });
      }
    }

    return options;
  }
};
