'use strict';

let { Serializable } = require('djantajs-compiler-core');
let { required, isSerializable, fill, annotations } = require('../../utils');

let _ = require ('lodash');
let Url = require ('./url');

let METHODS = [
  'HEAD',
  'OPTIONS',
  'GET',
  'PUT',
  'PATCH',
  'POST',
  'DELETE'
];

/**
 * @type {Verb}
 */
module.exports = class Verb extends Serializable {
  /**
   * The possible retension targets: <code>[Annotation.METHOD]</code>
   * @type {Array} mandatory class static method that provide the class
   *  retention target
   */
  static get targets() {
    return annotations.resource.verb.target;
  }

  /**
   * The possible annotation name
   *
   * @type {string}
   */
  static get annotation() {
    return annotations.resource.verb.type;
  }

  /**
   * Constructor to add attributes
   * @type {Array}
   */
  constructor(data, filePath) {
    super(data, filePath)
  }

  get annotationName() {
    return annotations.resource.verb.name;
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
    this.target = handler || 'toString';
  }

  /**
   * Gets one of the expected http verb
   * @return {string} a valid http verb
   */
  get label() {
    return this._label;
  }

  /**
   * Set the api expected verb
   * @param {string} verb the http api verb to set
   */
  set label(verb) {
    this._label = verb;
  }

  /**
   * Gets the user defined resource name
   * @return {string} a valid user defined resource name
   */
  get name() {
    return this._name || 'Get';
  }

  /**
   * Set the user explicit defined verb
   * @param {string} name the resource user defined verb
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Gets the controller expected urls
   * @return {Array|[String]|undefined|string} a valid request expected urls
   *  or undefined otherwise
   */
  get url() {
    return this._url;
  }

  /**
   * Set the request expected urls
   * @param {Array|[String]|undefined|string} url a valid expected request urls
   */
  set url(url) {
    this._url = url;
  }

  /**
   * Gets the verb expected attributes
   * @return {Array} a valid verv expected attributes
   */
  get attributes() {
    return this._attributes;
  }

  /**
   * Set the request expected attributes. However, even if it has been
   *  defined though, it's won't have any effect while the verb is 'GET'.
   * @param {Array} attributes a valid expected request attributes
   */
  set attributes(attributes) {
    this._attributes = attributes;
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

  addFearture(name, o){
    let self = this;
    if (!self._features) { self._features = {}; }

    if (!self._features[name]) { self._features[name] = [o]; }
    else { self._features[name].push(o); }
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, stash = _.defaults({});
    let exists = METHODS.indexOf(self.name.toUpperCase());

    if (-1 === exists) {
      throw new Error('Unexpected verb value: [%s]. Only the following value ' +
        'are expected: [%s]', self.name, JSON.stringify(METHODS, null, 0));
    }

    required('resource/verb', [
      { value: self.label, name: 'label' }
    ]);

    fill(self, stash, [
      { name: 'name', render: (o, name) => o[name] || o.target }, 'label', {
        name: 'url', alias: 'urls', render: (o, name) => {
          return _.reduce(_.isArrayLikeObject(o[name]) ? o[name] : [o[name]],
            (result, url) => {

              if (isSerializable(url)) {
                result = [...result || [], url.serialize];
              }
              else if (_.isString(url)) {
                let nurl = new Url();
                nurl.value = url;
                result = [...result || [], nurl.serialize];
              }
              return _.isEmpty(result) ? undefined : result;
            }, undefined);
        }
      }, 'description', { name: 'hooks', render: (o, name) => {
          return _.reduce(_.isArrayLikeObject(o[name]) ? o[name] : [o[name]],
            (result, hook) => isSerializable(hook) ?
              [...result || [], hook.serialize] :
              result,
            undefined);
        }
      }
    ]);

    if (!_.isNil(self._features)){
      Object.keys(self._features).forEach((feature) => {
        self._features[feature].forEach((value) => {

          if (_.isArrayLikeObject(value)) {
            value.forEach((val) => {
              stash[feature] = isSerializable(val) ?
                [...stash[feature] || [], val.serialize] :
                stash[feature];
            });
          }
          else if (isSerializable(value)) {
            stash[feature] = isSerializable(value) ?
              [...stash[feature] || [], value.serialize] :
              stash[feature];
          }
        });
      });
    }

    return fill(self, stash, [
      { name: 'target', alias: 'handler' }
    ]);
  }
};
