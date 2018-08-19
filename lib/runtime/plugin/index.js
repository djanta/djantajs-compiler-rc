'use strict';

let { isSerializable, required, fill, annotations } = require('../../utils');
let { Annotation, Serializable } = require('djantajs-compiler-core');
let _ = require ('lodash');

/**
 * Core Plugin annotation implementation class.
 * @type {Plugin}
 */
module.exports = class Plugin extends Serializable {
  /**
   * The possible targets
   *
   * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets () {
    return annotations.plugin.index.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.plugin.index.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath){
    super(data, filePath)
  }

  get annotationName() {
    return annotations.plugin.index.name;
  }

  get name() {
    return this._verb;
  }

  set name(name) {
    this._verb = name;
  }

  get version() {
    return this._version || '0.0.0';
  }

  set version(version) {
    this._version = version;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description  = description;
  }

  get enabled() {
    return _.isUndefined(this._enabled)? true: this._enabled;
  }

  set enabled(enabled) {
    this._enabled = enabled;
  }

  get order() {
    return this._order;
  }

  set order(order) {
    this._order = order;
  }

  get engine() {
    return this._engine;
  }

  set engine(engine) {
    this._engine = engine;
  }

  get tags() {
    return this._tags;
  }

  set tags(tags) {
    this._tags = tags;
  }

  get imports() {
    return this._imports;
  }

  set imports(imports) {
    this._imports = imports;
  }

  get portes() {
    return this._portes || [];
  }

  set portes(portes) {
    this._portes = portes;
  }

  get settings() {
    return this._settings || [];
  }

  set settings(settings) {
    this._settings = settings;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get deprecated() {
    return this._deprecation;
  }

  /**
   * Gets the component annotated method name
   * @param {string} deprecation the target annotated method name
   */
  set deprecated(deprecation) {
    this._deprecation = deprecation;
  }

  /**
   * Get the target introspected annotated method name
   * @return {string} the annotated method name
   */
  get migration() {
    return this._migration;
  }

  /**
   * Gets the component annotated method name
   * @param {string} migration the target annotated method name
   */
  set migration(migration) {
    this._migration = migration;
  }

  /**
   * Render the serializeable plugin configuration
   * @return {*}
   */
  get serialize() {
    let self = this, options = {};

    required('plugin/service', [
      { value: self.version, key: 'version' },
      { value: self.name, key: 'name' }
    ]);

    return fill(self, {}, [
      'name', 'enabled', 'version', 'order', 'engine', 'tags', 'imports',
      { name: 'portes', render: (o, name) => _.map(o[name] || [],
        porte => isSerializable(porte) ? porte.serialize : undefined)
      },
      { name: 'settings', render: (o, name) => _.map(o[name] || [],
        setting => isSerializable(setting) ? setting.serialize : undefined)
      },
      { name: 'migration', render: (o, name) => isSerializable(o[name]) ?
        o[name].serialize : undefined
      }, 'description'
    ]);
  }
};
