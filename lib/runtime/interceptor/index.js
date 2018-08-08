'use strict';

let _ = require ('lodash');
let { Annotation, Serializable } = require('djantajs-compiler-core');

let TYPE = 'interceptor';
let NAME = TYPE;
let TARGETS = [Annotation.DEFINITION];

let PRIORITIES = [
  'security',
  'prepare',
  'control',
  'validation',
  'fetching',
  'caching'
];

/**
 * @type {Interceptor}
 */
module.exports = class Interceptor extends Serializable {

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
  constructor (data, filePath) {
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
  get routine() {
    return this._routines;
  }

  /**
   * Gets the interceptor default invocation configuration
   * @param {Object} routine the interceptor default invocation configuration
   */
  set routine(routine) {
    (this._routines = this._routines || {})[routine.annotationName] = routine;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name)) {
      throw new Error('Unexpected invalid interceptor name at propterty "name"');
    }

    options.name = self.name;

    if (self.priority) { options.priority = self.priority; }
    if (self.builtin) { options.builtin = self.builtin; }
    if (self.order) { options.order = self.order; }
    if (self.options) { options.options = self.options; }
    if (self.handler) { options.handler = self.handler; }

    let routines = self.routine;
    if (routines) {
      Object.keys(routines).forEach((routine) => {
        options[routine] = routines[routine].serialize;
      });
    }

    if (self.description) { options.description = self.description; }

    return options;
  }
};
