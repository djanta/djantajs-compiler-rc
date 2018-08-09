'use strict';

let _ = require('lodash');
let { Annotation, Serializable } = require('djantajs-compiler-core');
let {
  annotations, required, isSerializable, fill, defaults
} = require('../../utils');

let TYPE = 'bundle';
let NAME = TYPE;
let TARGETS = [Annotation.DEFINITION];

/**
 * Bundle annotation class configuration
 * @type {Bundle}
 */
module.exports = class Bundle extends Serializable {
  /**
   * The possible targets
   *
   * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
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
  init(data) {
    // this._verb = data.value || (data.name || 'default value');

    /*
    this._version = data.version || undefined;
    this._description= data.description || 'No comment';
    this._enabled = data.enabled || true;
    this._order = data.order || 1000;

    this._homepage = data.homepage || 'www.djanta.io';
    this._tags = data.tags || undefined;
    this._imports = data.imports || undefined;
    this._author = data.author || undefined;

    */
  }

  /**
   * Gets the bundle base namespace
   * @return {string} Returns the bundle namespace
   */
  get ns() {
    return this._ns;
  }

  /**
   * Sets the bundle base namespace
   * @param {string} ns the given bundle base namespace
   */
  set ns(ns) {
    this._ns = ns;
  }

  /**
   * Gets the bundle litteral given name
   * @return {*|string} Returns the current bundle litteral given name
   */
  get name() {
    return this._name;
  }

  /**
   * Sets the current bundle given litteral name
   * @param {*|string} value The given bundle name
   */
  set name(value) {
    this._name = value;
  }

  /**
   * Gets the bundle deployment order. Default: <code>1000</code>
   * @return {number|*} Returns the current bundle deployment order
   */
  get order() {
    return this._order;
  }

  /**
   * Sets the current bundle deployment order
   * @param {number|*} value Set the current bundle deployment order
   */
  set order(value) {
    this._order = value;
  }

  /**
   * Gets the current bundle given description
   * @return {string|*} Returns the current bundle given description
   */
  get description() {
    return this._description;
  }

  /**
   * Set the current bundle readable description
   * @param {string|*} value Sets the current bundle readable description
   */
  set description(value) {
    this._description = value;
  }

  /**
   * Gets the bundle activation status
   * @return {*|boolean} Returns the bundle given activation status
   */
  get enabled() {
    return this._enabled;
  }

  /**
   * Sets the current bundle activation status
   * @param {*|boolean} value the value to assign to the activtion status
   */
  set enabled(value) {
    this._enabled = value;
  }

  /**
   * Gets the bundle given tags
   * @return {*|[]} Returns the current bundle tags
   */
  get tags() {
    return this._tags;
  }

  /**
   * Sets the current bundle tags
   * @param {*|[]} tags the current bundle assigned tags
   */
  set tags(tags) {
    this._tags = tags;
  }

  /**
   * Gets the current bundle homepage
   * @return {*|string} Returns the current bundle website homepage
   */
  get homepage() {
    return this._homepage;
  }

  /**
   * Sets the current bundle website url
   * @param {*|string} page a valid current webpage url
   */
  set homepage(page) {
    this._homepage = page;
  }

  /**
   * Gets the current bundle imported dependency
   * @return {undefined|[]} the current bundle defined imported dependency
   */
  get imports() {
    return this._imports;
  }

  /**
   * Sets the current bundle imported dependency
   * @param {undefined|[]} value
   */
  set imports(value) {
    this._imports = value;
  }

  /**
   * Gets the current bundle author configuration
   * @return {*|Array|undefined} Returns the current bundle author
   */
  get author() {
    return this._author;
  }

  /**
   * Sets the current bundle author configuration
   * @param {*|Array|undefined} value the current author configuration
   */
  set author(value) {
    this._author = value;
  }

  get serialize() {
    let self = this;

    // Serialize the current bundle state ...
    return fill(self, _.merge({}, defaults.bundle), [
      'name', 'ns', 'version', 'description', 'homepage',
      'author', 'order', 'enabled', 'tags', 'imports'
    ]);
  }
};
