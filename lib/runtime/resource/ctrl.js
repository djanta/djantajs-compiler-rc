'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const _ = require ('lodash');
const string = require('string');

const TYPE = 'controller';
const NAME = TYPE;
const TARGETS = [Annotation.DEFINITION];

/**
 * Hook annotation.
 *
 * @type {Controller}
 */
module.exports = class Controller extends Serializable {

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
   * Gets the component annotated method interceptor
   * @param {string} name the target annotated method interceptor
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Gets the resource annotated controller name
   * @return {string} the target annotated resource name
   */
  get name() {
    return this._name;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get enabled() {
    return this._enabled || true;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} enabled the target annotated method name
   */
  set enabled(enabled) {
    this._enabled = enabled;
  }

  /**
   * sets the controller default resource root url
   * @param {string} root the controller default resource root url
   */
  set root(root) {
    this._root = root;
  }

  /**
   * Gets the controller default resource root url
   * @return {string} the controller default resource root url
   */
  get root() {
    return this._root;
  }

  /**
   * Gets the annotated controller associate data model name
   * @param {string} model the target controller associate model
   */
  set model(model) {
    this._model = model;
  }

  /**
   * Gets the resource annotated controller name
   * @return {string} the target annotated resource name
   */
  get model() {
    return this._model;
  }

  /**
   * Gets the annotated controller associate data model name
   * @param {*} hook the target controller associate model
   */
  set hook(hook) {
    this._hook = hook;
  }

  /**
   * Gets the resource annotated controller name
   * @return {string} the target annotated resource name
   */
  get hook() {
    return this._hook;
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
   * Add a new verb to the controller
   * @param {Verb} verb the target verb to bind with the controller
   */
  addVerb(verb) {
    if (!this._verbs) this._verbs = [];
    this._verbs.push(verb);
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    if(_.isUndefined(self.name) || _.isEmpty(self.name) || _.isNull(self.name))
      throw new Error('Unexpected invalid controller value at propterty "name"');

    if(_.isUndefined(self.root) || _.isEmpty(self.root) || _.isNull(self.root))
      throw new Error('Unexpected invalid controller value at propterty "name"');

    options.name = self.name;
    options.root = self.root;

    if (self.enabled) options.enabled = self.enabled;
    if (self.model) options.model = self.model;

    if (self.hook) {
      (_.isArray(self.hook)? self.hook: [self.hook]).forEach((hook) => {
        if (hook.serialize) (options.hook = (options.hook || [])).push(hook.serialize);
      });
    }

    if (self.description) options.description = self.description;
    if(self._verbs && self._verbs.length > 0){
      self._verbs.forEach((verb) => {
        if (verb) (options.endpoints = options.endpoints || []).push(verb.serialize);
      });
    }

    return options;
  }
};
