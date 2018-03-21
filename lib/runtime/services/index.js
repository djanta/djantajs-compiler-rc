'use strict';

const { isSerializable } = require('../../utils');
const { Annotation, Serializable } = require('djantajs-compiler-core');
const { required } = require('../../utils');

const _ = require ('lodash');

const TYPE = 'plugin';
const NAME = TYPE;
const TARGETS = [Annotation.DEFINITION];

module.exports = class Plugin extends Serializable {

  /**
   * The possible targets
   *
   * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
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
  constructor(data, filePath){
    super(data, filePath)
  }

  get annotationName() {
    return NAME;
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

  get serialize() {
    let self = this, options = {};

    required('plugin/service', [{value: self.name, key: 'name'}, {value: self.version, key: 'version'}]);

    options.name = self.name;
    options.enabled = self.enabled;
    options.version = self.version;

    if (self.order) options.order = self.order;
    if (self.engine) options.engine = self.engine;
    if (self.tags) options.tags = self.tags;
    if (self.imports) options.imports = self.imports;

    (self.portes || []).forEach((porte) => {
      if (isSerializable(porte)) (options.portes = options.portes || []).push(porte.serialize);
    });

    (self.settings || []).forEach((setting) => {
      if (isSerializable(setting)) (options.settings = options.settings || []).push(setting.serialize);
    });

    if (self.description) options.description = self.description;
    if (isSerializable(self.migration)) options.migration = self.migration.serialize;

    return options;
  }
};
