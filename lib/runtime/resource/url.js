'use strict';

let { Serializable } = require('djantajs-compiler-core');
let { isSerializable, required, fill, annotations } = require('../../utils');

let _ = require ('lodash');
let UrlPattern = require ('url-pattern');
let Param = require ('./param');

/**
 * @type {Url}
 */
module.exports = class Url extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets () {
    return annotations.resource.url.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.url.type;
  }

  /**
   * Constructor to add attributes
   * @param {Array} data the given annotation unparsing data
   * @param {string} filePath the target annotated class script file
   * @constructor
   */
  constructor (data, filePath){
    super(data, filePath)
  }

  /**
   * Gets the defined annotation name.
   * @return {string} Returns the given annotation name;
   */
  get annotationName() {
    return annotations.resource.url.name;
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
   * @return {{}|undefined} a valid request expected urls or undefined otherwise
   */
  get params() {
    return this._params || _.defaults({});
  }

  /**
   * Set the request expected urls
   * @param {{}|undefined} params a valid expected request urls
   */
  set params(params) {
    this._params = params;
  }

  /**
   * Gets the url description which will be use to generate the blueprint
   * documentation.
   *
   * @return {string} a valid resource url documentation or
   *  <code>undefiined</code> otherwise.
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
  get serialize () {
    let self = this;
    let stash = _.defaults({});

    required('resource/url', [
      { value: self.value, name: 'value' }
    ]);

    return fill(self, stash, [
      { name: 'value', alias: 'url'},
      { name: 'value', alias: 'params', render: (o, name) => {
        return _.reduce([...new UrlPattern(o[name]).names || []],
          (result, value) => {
            let param = new Param();
            param.name = value;

            let serialize = param.serialize || {};
            return !_.isNil(value) ? [...result || [], _.merge({},
              serialize, self.params[serialize.name] || {})] :
              result;
          }, undefined);
        }
      }
    ]);
  }
};
