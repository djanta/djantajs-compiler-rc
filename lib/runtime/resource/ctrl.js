'use strict';

let _ = require ('lodash');
let { Serializable } = require('djantajs-compiler-core');
let { required, fill, annotations, isSerializable } = require('../../utils');
let string = require('string');

/**
 * Hook annotation.
 *
 * @type {Controller}
 */
module.exports = class Controller extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.controller.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.controller.type;
  }

  /**
   * Constructor to add attributes
   * @param {Array} data the given annotation unparsing data
   * @param {string} filePath the target annotated class script file
   * @constructor
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.resource.controller.name;
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
   * @param {*|[]} hook the target controller associate model
   */
  set hook(hook) {
    this._hook = hook;
  }

  /**
   * Gets the resource annotated controller name
   * @return {*|[]} the target annotated resource name
   */
  get hook () {
    return this._hook;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get description () {
    return this._description;
  }

  /**
   * Gets the component annotated method name
   * @param {string} description the target annotated method name
   */
  set description (description) {
    this._description = description;
  }

  /**
   * Add a new verb to the controller
   * @param {Verb} verb the target verb to bind with the controller
   */
  addVerb (verb) {
    this._verbs = [...this._verbs || [], verb];
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize () {
    let self = this;

    required('resource/controller', [
      { value: self.name, name: 'name' },
      { value: self.root, name: 'root' }
    ]);

    return fill(self, _.defaults({}), [
      'name', 'root', 'enabled', 'model', {
        name: 'hook', render: (o, nm) => _.reduce(_.isArray(o[nm]) ?
          o[nm] : [o[nm]], (result, hook) => isSerializable(hook) ?
            [...result || [], hook.serialize] :
            result
        , undefined)
      },
      {
        name: '_verbs', render: (o, nm) => _.reduce(o[nm], (result, verb) => {
          return isSerializable(verb) ?
            [...result || [], verb.serialize] :
            result;
        }, undefined), alias: 'endpoints'
      }, 'description'
    ]);
  }
};
