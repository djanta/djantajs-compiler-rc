'use strict';

let _ = require ('lodash');
let { required, fill, annotations } = require('../../utils');
let { Serializable } = require('@djanta/djantajs-compiler-core');

/*
let STRATEGIES = [
  'redirect',
  'reject',
  'warning'
];
*/

/**
 * Hook annotation.
 *
 * @type {Migration}
 */
module.exports = class Migration extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets () {
    return annotations.plugin.migration.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.plugin.migration.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.plugin.migration.name;
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
   * Get the target introspected annotated method value
   * @return {string} the annotated method value
   */
  get strategy() {
    return this._strategy || 'warning';
  }

  /**
   * Gets the component annotated method name
   * @param {string} strategy the target annotated method value
   */
  set strategy(strategy) {
    this._strategy = strategy;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get since() {
    return this._since;
  }

  /**
   * Gets the component annotated method name
   * @param {string} since the target annotated method name
   */
  set since(since) {
    this._since = since;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get message() {
    return this._message;
  }

  /**
   * Gets the component annotated method name
   * @param {string} message the target annotated method name
   */
  set message(message) {
    this._message = message;
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
   * @return {Object} the annotated method name
   */
  get redirection() {
    return this._redirection;
  }

  /**
   * Gets the component annotated method name
   * @param {Object} redirection the target annotated method name
   */
  set redirection(redirection) {
    this._redirection = redirection;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this;

    required('setting', [
      { value: self.since, name: 'since' },
      { value: self.strategy, name: 'strategy' },
      { value: self.message, name: 'message' }
    ]);

    return fill(self, _.defaults({}), [
      'since', 'strategy', 'message', {
        name: 'redirection', alias: 'target'
      }, 'description'
    ]);
  }
};
