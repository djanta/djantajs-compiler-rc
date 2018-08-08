'use strict';

let { Serializable, Annotation } = require('djantajs-compiler-core');
let _ = require ('lodash');

let TYPE = 'validator';
let NAME = TYPE;
let TARGETS = [Annotation.METHOD];

/**
 * Qualified request validator annotation implementation
 * @type {RequestValidator}
 */
module.exports = class RequestValidator extends Serializable {

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
   * Optional initialization method that can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data) {}

  /**
   * Gets the given request validator
   * @return {RegExp} Returns the given request validator expression.
   */
  get expr() {
    return this._regex;
  }

  /**
   * Sets request current request parameter validator regexp
   * @param {RegExp} regex Sets the current given request parameter validator expr
   */
  set expr(regex) {
    this._regex = regex;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};
    return options;
  }
};
