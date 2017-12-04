'use strict';

const { Annotation } = require('djantajs-compiler-core');
const { Serializable } = require('djantajs-compiler-core');

const TYPE = 'bundle';
const NAME = TYPE;
const TARGETS = [Annotation.DEFINITION];

/**
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
    this._verb = data.value || (data.name || 'default value');

    this._version = data.version || undefined;
    this._description= data.description || 'No comment';
    this._enabled = data.enabled || true;
    this._order = data.order || 1000;

    this._homepage = data.homepage || 'www.djanta.io';
    this._tags = data.tags || undefined;
    this._imports = data.imports || undefined;
    this._author = data.author || undefined;
  }

  get name() {
    return this._verb;
  }

  get version() {
    return this._version;
  }

  get order() {
    return this._order;
  }

  get description() {
    return this._description;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    this._enabled = value;
  }

  get tags() {
    return this._tags;
  }

  get homepage() {
    return this._homepage;
  }

  get imports() {
    return this._imports;
  }

  set imports(value) {
    this._imports = value;
  }

  get author() {
    return this._author;
  }

  get serialize() {
    let self = this, options = {};
    return options;
  }
};
