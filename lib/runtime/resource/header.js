'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');

const TYPE = 'header';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * @type {Header}
 */
module.exports = class Header extends Serializable {

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
  init(data) {
    //this._name = data.value || undefined;
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
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name))
        throw new Error('Unexpected invalid header name at propterty "name"');

    options.name = self.name;
    if(self.value) options.value = self.value;

    return options;
  }
};
