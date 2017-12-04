'use strict';

const _ = require ('lodash');

const { Annotation } = require('djantajs-compiler-core');
const { Serializable } = require('djantajs-compiler-core');

const { required } = require('../../utils');
const { isSerializable } = require('../../utils');

const TYPE = 'runtime';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

/**
 * Hook annotation.
 *
 * @type {RuntimeLifecycle}
 */
module.exports = class RuntimeLifecycle extends Serializable {

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
    return this._ttl || 300; //300ms by default
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
    //this.target = handler || 'toString';
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};
    required('runtime/lifecycle', [{value: self.event, key: 'event'}]);

    (Array.isArray(self.event)? self.event : [self.event]).forEach((event) => {
      (options.event = options.event || []).push(event);
    });

    options.async = self.async;
    options.ttl = self.ttl;
    options.enabled = self.enabled;

    if (self.description) options.description = self.description;
    if (self.target) options.handler = self.target;

    return options;
  }
};
