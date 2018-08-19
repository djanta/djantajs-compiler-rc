'use strict';

let _ = require ('lodash');
let { Serializable} = require('djantajs-compiler-core');
let { required, annotations, fill } = require('../../utils');

/**
 * Runtime lifecycle hook annotation implementation.
 *
 * @type {RuntimeLifecycle}
 */
module.exports = class RuntimeLifecycle extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets() {
    return annotations.lifecycle.runtime.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.lifecycle.runtime.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.lifecycle.runtime.name;
  }

  /**
   * Gets the component annotated method interceptor.
   * @return {Array} on the target annotated method interceptor
   */
  get event() {
    return this._event;
  }

  /**
   * Gets the component annotated method interceptor
   * @param {Array} event the target annotated method interceptor
   */
  set event(event) {
    this._event = event;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get enabled() {
    return _.isUndefined(this._enabled)? true: this._enabled;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} enabled the target annotated method name
   */
  set enabled(enabled) {
    this._enabled = enabled;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get async() {
    return _.isUndefined(this._async)? true: this._async;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} async the target annotated method name
   */
  set async(async) {
    this._async = async;
  }

  /**
   * Get the target introspected annotated method name
   * @return {boolean} the annotated method name
   */
  get once() {
    return _.isUndefined(this._once)? false: this._once;
  }

  /**
   * Gets the component annotated method name
   * @param {boolean} once the target annotated method name
   */
  set once(once) {
    this._once = once;
  }

  /**
   * Gets the component annotated method name
   * @param {number} ttl the target annotated method name
   */
  set ttl(ttl) {
    this._ttl = ttl;
  }

  /**
   * Get the target introspected annotated method name
   * @return {number} the annotated method name
   */
  get ttl() {
    return this._ttl || 300; // 300ms by default
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
    // this.target = handler || 'toString';
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, cumulator = {};

    required('lifecycle/runtime', [
      { value: self.event, key: 'event' }
    ]);

    return fill(self, _.defaults({}), [
      // { name: 'event', render: (self_, name) => {} },
      'event', 'async', 'ttl', 'enabled', 'description', 'target'
    ]);
  }
};
