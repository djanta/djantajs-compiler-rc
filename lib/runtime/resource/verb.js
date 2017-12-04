'use strict';

const { Serializable } = require('djantajs-compiler-core');
const { Annotation } = require('djantajs-compiler-core');

const { required } = require('../../utils');
const { isSerializable } = require('../../utils');

const _ = require ('lodash');
const Url = require ('./url');

const TYPE = 'verb';
const NAME = TYPE;
const TARGETS = [Annotation.METHOD];

const METHODS = [
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
   * @return {Array} a valid request expected urls or undefined otherwise
   */
  get url() {
    return this._url;
  }

  /**
   * Set the request expected urls
   * @param {*} url a valid expected request urls
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
   * Set the request expected attributes. However, even if it has been defined though, it's won't have any effect while
   * the verb is 'GET'.
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
    if(!self._features) self._features = {};

    if(!self._features[name]) self._features[name] = [o];
    else self._features[name].push(o);
  }

  /**
   * Convert the current class instance onto json data format
   * @return {object} a valid class instance json instance
   */
  get serialize() {
    let self = this, options = {};

    let exists = METHODS.indexOf(self.name.toUpperCase());
    if (-1 === exists) throw new Error('Unexpected verb value: ['+ self.name
      + ']. Only the following value are expected: ['+ JSON.stringify(METHODS,null,0) + ']');

    required('resource/verb', [{value: self.label, key: 'label'}]);

    options.name = self.name || self.target;
    options.label = self.label;

    let url = self.url;
    if (typeof url !== 'undefined') {
      (_.isArray(url)? url: [url]).forEach((u) => {
        if (_.isString(u)) {
          let nurl = new Url();
          nurl.value = u;
          u = nurl;
        }

        if (u.serialize) (options.urls = options.urls || []).push(u.serialize);
      });
    }

    if (self.description) options.description = self.description;

    (self.hooks || []).forEach((hook) => {
      if (isSerializable(hook)) (options.hooks = options.hooks || []).push(hook.serialize)
    });

    if(self._features){
      Object.keys(self._features).forEach((feature) => {
        self._features[feature].forEach((value) => {
          if(Array.isArray(value)) {
            value.forEach((v) => {
              if (isSerializable(v)) (options[feature] = options[feature] || []).push(v.serialize);
            });
          }
          else {
            if (isSerializable(value)) (options[feature] = options[feature] || []).push(value.serialize);
          }
        });
      });
    }

    if (self.target) options.handler = self.target;
    return options;
  }
};
