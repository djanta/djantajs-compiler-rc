'use strict';

let _ = require('lodash');
let { Annotation } = require('djantajs-compiler-core');

let has = (self, property) => self &&
  self.constructor.prototype.hasOwnProperty('serialize');

// shared annotation configuration
let definitions = {
  setting: {
    type: 'setting',
    name: 'setting',
    target: [Annotation.DEFINITION]
  }
};

// module defaults configuration context.
let defaults = {
  bundle: {
    order: 1000,
    description: 'No comment',
    enabled: true,
    homepage: 'https://djantajs.io',
    author: [
      { name: 'DJANTA, LLC', url: 'https://www.djantajs.io' }
    ],
    license: 'MIT'
  },
  retentions: [
    'classes',
    'constructors',
    'properties',
    'methods'
  ]
};

module.exports = {
  annotations: definitions,
  defaults: defaults,
  isSerializable: (self) => {
    // return self && self.constructor.prototype.hasOwnProperty('serialize');
    return has(self, 'serialize');
  },
  required: (self, fields, options = {}) => {
    (Array.isArray(fields)? fields: [fields]).forEach((field) => {
      if (_.isEmpty(field.value) || _.isNull(field.value)) {
        throw new Error('Unexpected invalid '+ self +
          ' value at propterty: `{field.name}`');
      }
    })
  },
  fill: (self, stash = {}, names = []) => {
    (_.isArrayLikeObject(names) ? names : [...names]).forEach((val) => {
      if (!_.isNil(val) && _.isString(val)) {
        stash[val] = has(self, val) && !_.isNil(self[val]) ?
          self[val] : undefined;
      }
      else if (_.isPlainObject(val) && !_.isNil(val.name)) {
        let name = val.name; // gets back the name ...
        if (!_.isNil(val.render) && _.isFunction(val.render)) {
          stash[_.isNil(val.alias)? name : val.alias] = val.render(self, name);
        } else {
          stash[_.isNil(val.alias)? name : val.alias] = val.default;
        }
      }
    });

    // returns the given cumulator context.
    return stash;
  }
};
