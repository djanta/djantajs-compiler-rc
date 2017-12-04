'use strict';

const _ = require ('lodash');
const { required } = require('../../utils');
const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const TYPE = 'migration';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD, Annotation.DEFINITION];

const STRATEGIES = [
  'redirect',
  'reject',
  'warning'
];

/**
 * Hook annotation.
 *
 * @type {Migration}
 */
module.exports = class Migration extends Serializable {

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
  constructor(data, filePath) {
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
    let self = this, options = {};
    required('setting', [
      {value: self.since, key: 'since'},
      {value: self.strategy, key: 'strategy'},
      {value: self.message, key: 'message'}
    ]);

    options.since = self.since;
    options.strategy = self.strategy;
    options.message = self.message;

    if(self.description) options.description = self.description;
    if(self.redirection) options.redirection = self.redirection;

    return options;
  }
};
