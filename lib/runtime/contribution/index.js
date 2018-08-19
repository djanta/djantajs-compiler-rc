'use strict';

let _ = require ('lodash');
let { Annotation, Serializable} = require('djantajs-compiler-core');
let { isSerializable, required, fill, annotations } = require('../../utils');

/**
 * Contribution annotation class implementation.
 *
 * @type {Contribution}
 */
module.exports = class Contribution extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   * retention target
   */
  static get targets() {
    return annotations.contribution.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.contribution.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath){
    super(data, filePath)
  }

  get annotationName() {
    return annotations.contribution.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param  {Object} data
   * @return {void}
   */
  init(data) {
    // this's just a comment to avoid empty method rule error
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get name() {
    return this._verb;
  }

  /**
   * Set the api expected name
   * @param {string} name the name
   */
  set name(name) {
    this._verb = name;
  }

  /**
   * Gets the controller handlable method name
   * @return {string} a valid annotated method name
   */
  get handler() {
    return this.target || 'toString';
  }

  /**
   * Set the current controller handlable method name
   * @param {string} handler the handlable method name
   */
  set handler(handler) {
    this.target = handler || 'toString';
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get description() {
    return this._description;
  }

  /**
   * Gets the component annotated method name
   * @param {string} description the target annotated method name
   */
  set description(description) {
    this._description = description;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get target() {
    return this._target;
  }

  /**
   * Gets the component annotated method name
   * @param {string} target the target annotated method name
   */
  set target(target) {
    this._target = target;
  }

  /**
   * Get the target introspected annotated method name
   * @return {Object|Array} the annotated method name
   */
  get options() {
    return this._options;
  }

  /**
   * Gets the component annotated options
   * @param {Object|Array} options the target annotated options
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Gets the controller expected urls
   * @return {Array} a valid request expected urls or undefined otherwise
   */
  get portes() {
    return this._portes;
  }

  /**
   * Set the request expected urls
   * @param {Array} portes a valid expected request urls
   */
  set portes(portes) {
    this._portes = portes;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    required('runtime/contribution/index', [
      { value: self.handler, name: 'handler' },
      { value: self.name, name: 'name' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'handler',
      { name: 'portes', render: (o, name) => _.map(o[name] ||
        [], (porte) => porte.serialize)
      }, 'options', 'description'
    ]);
  }
};
