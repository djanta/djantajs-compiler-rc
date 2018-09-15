'use strict';

let _ = require ('lodash');
let { Serializable } = require('@djanta/djantajs-compiler-core');
let { fill, annotations, required } = require('../../utils');

/**
 * @type {Interceptor}
 */
module.exports = class Interceptor extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets() {
    return annotations.interceptor.index.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.interceptor.index.type;
  }

  /**
   * Constructor to add attributes.
   * @param {*} data before annotation data
   * @param {string} filePath annotation script file
   * @constructor
   */
  constructor (data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.interceptor.index.name;
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
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get name() {
    return this._name;
  }

  /**
   * Gets the component annotated method name
   * @param {string} name the target annotated method name
   */
  set name(name) {
    this._name = name;
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
   * Gets one of the expected http request interceptor running order
   * @return {string} a valid http request interceptor running order
   */
  get priority() {
    return this._priority;
  }

  /**
   * Set the api expected interceptor  running order
   * @param {string} priority the http request interceptors  running order
   */
  set priority(priority) {
    this._priority = priority;
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
   * @return {boolean} the annotated method name
   */
  get builtin() {
    return this._builtin;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} builtin the target annotated method name
   */
  set builtin(builtin) {
    this._builtin = builtin;
  }

  /**
   * Get the target introspected annotated method name
   * @return {number} the annotated method name
   */
  get order() {
    return this._order || 1000;
  }

  /**
   * Gets the component annotated method name
   * @param {number} order the target annotated method name
   */
  set order(order) {
    this._order = order;
  }

  /**
   * Get the interceptor environment setting name
   * @return {string} the target environment setting name
   */
  get options() {
    return this._options;
  }

  /**
   * Gets the interceptor default invocation configuration
   * @param {string} options the interceptor default invocation configuration
   */
  set options(options) {
    this._options = options;
  }

  /**
   * Get the interceptor environment setting name
   * @return {Object} the target environment setting name
   */
  get routine () {
    return this._routines;
  }

  /**
   * Gets the interceptor default invocation configuration
   * @param {Object} routine the interceptor default invocation configuration
   */
  set routine (routine) {
    (this._routines = this._routines || {})[routine.annotationName] = routine;
  }

  /**
   * Convert the current class instance into json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, cumulator = {};

    required('interceptor/index', [
      { value: self.name, name: 'name'}
    ]);

    cumulator = fill(self, cumulator, [
      'name', 'priority', 'builtin', 'order', 'options', 'handler',
      'description'
    ]);

    let routines = self.routine;

    // console.log('Routine:\n%s\n', JSON.stringify(routines, 2, null));

    if (routines) {
      Object.keys(routines).forEach((routine) => {
        cumulator[routine] = routines[routine].serialize;
      });
    }
    return cumulator;
  }
};
