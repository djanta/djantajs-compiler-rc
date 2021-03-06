'use strict';

let _ = require ('lodash');
let { Serializable, Annotation } = require('@djanta/djantajs-compiler-core');
let { required, fill, annotations } = require('../../utils');

let TYPE = 'extension';
let NAME = TYPE;
let TARGETS = [Annotation.METHOD, Annotation.DEFINITION];

/**
 * contribution extension point class implementation
 * @type {Extension}
 */
module.exports = class Extension extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class retention
   *  target
   */
  static get targets() {
    return annotations.extension.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.extension.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath){
    super(data, filePath)
  }

  get annotationName() {
    return annotations.extension.name;
  }

  /**
   * Optional initialization method that
   * can be used to transform data
   *
   * @param {Object} data
   * @return {void}
   */
  init(data) {
    // this's just a comment to avoid empty method rule error
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get plugin() {
    return this._plugin;
  }

  /**
   * Set the api expected service name
   * @param {string} plugin the service name
   */
  set plugin(plugin) {
    this._plugin = plugin;
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
   * Get the target expected porte name
   * @return {string} the expected porte name
   */
  get name() {
    return this._name;
  }

  /**
   * Sets the target expected porte name
   * @param {string} name the target expected porte name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Get the target expected plugin version
   * @return {string} the expected plugin version
   */
  get version() {
    return this._version;
  }

  /**
   * Sets the target expected plugin version
   * @param {string} version the target expected plugin version
   */
  set version(version) {
    this._version = version;
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    required('runtime/contribution/extension', [
      { value: self.plugin, name: 'plugin' },
      { value: self.name, name: 'name' }
    ]);

    return fill(self, _.defaults({}), [
      { name: 'name', alias: 'porte' },
      { name: 'plugin', render: (o, name) => ~!!o[name].indexOf('@') ?
        o[name].split('@')[0] : o[name]
      },
      { name: 'plugin', render: (o, name) => -1 !== o[name].indexOf('@') ?
        o[name].split('@')[1] : self.version, alias: 'version'
      }, 'description'
    ]);
  }
};
