'use strict';

let _ = require('lodash');
let { Annotation } = require('@djanta/djantajs-compiler-core');

const has = (self, property) => self &&
  self.constructor.prototype.hasOwnProperty('serialize');

// shared annotation configuration
const model = {
  setting: {
    type: 'setting',
    name: 'setting',
    target: [Annotation.DEFINITION]
  },
  extension: {
    type: 'extension',
    name: 'extension',
    target: [
      Annotation.DEFINITION,
      Annotation.METHOD
    ]
  },
  contribution: {
    type: 'contribution',
    name: 'contribution',
    target: [
      Annotation.METHOD,
      Annotation.DEFINITION
    ]
  },
  interceptor: {
    after: {
      type: 'after',
      name: 'after',
      target: [Annotation.METHOD]
    },
    before: {
      type: 'before',
      name: 'before',
      target: [Annotation.METHOD]
    },
    index: {
      target: [Annotation.DEFINITION],
      type: 'interceptor',
      name: 'interceptor'
    }
  },
  lifecycle: {
    runtime: {
      name: 'runtime',
      target: [Annotation.METHOD],
      type: 'runtime'
    }
  },
  bundle: {
    index: {
      name: 'bundle',
      target: [Annotation.DEFINITION],
      type: 'bundle'
    }
  },
  plugin: {
    index: {
      name: 'plugin',
      target: [Annotation.DEFINITION],
      type: 'plugin'
    },
    migration: {
      name: 'migration',
      target: [Annotation.METHOD, Annotation.DEFINITION],
      type: 'migration'
    },
    porte: {
      name: 'porte',
      target: [Annotation.DEFINITION],
      type: 'porte'
    }
  },
  resource: {
    attribute: {
      name: 'attribute',
      target: [Annotation.METHOD],
      type: 'attribute'
    },
    controller: {
      name: 'controller',
      target: [Annotation.DEFINITION],
      type: 'controller'
    },
    header: {
      name: 'header',
      target: [Annotation.METHOD],
      type: 'header'
    },
    hook: {
      name: 'hook',
      target: [Annotation.METHOD, Annotation.DEFINITION],
      type: 'hook'
    },
    param: {
      name: 'param',
      target: [Annotation.METHOD],
      type: 'param'
    },
    request: {
      name: 'request',
      target: [Annotation.METHOD],
      type: 'request'
    },
    response: {
      name: 'response',
      target: [Annotation.METHOD],
      type: 'response'
    },
    url: {
      name: 'url',
      target: [Annotation.METHOD],
      type: 'url'
    },
    verb: {
      name: 'verb',
      target: [Annotation.METHOD],
      type: 'verb'
    }
  }
};

// module defaults configuration context.
const definitions = {
  bundle: {
    order: 1000,
    enabled: true,
    homepage: 'https://djantajs.io',
    author: [
      {
        name: 'DJANTA, LLC',
        url: 'https://djantajs.io'
      }
    ],
    license: 'MIT'
  },
  retentions: [
    'classes',
    'constructors',
    'properties',
    'methods'
  ],
  group: {
    classes: ['contribution', 'bundle', 'plugin', 'interceptor',
      'controller']
  }
};

/**
 * Export the utils class functions
 * @type {{annotations:{}, defaults: {}, concat: Function, isSerializable: Function, required: Function, fill: Function}}
 */
module.exports = {
  annotations: model,
  defaults: definitions,
  concat: (src, value, property = undefined) => {
    if (_.isArray(src) || _.isNil(property)) {
      return [...src || [], value];
    }
    else if (_.isObjectLike(src) && !_.isNil(property)) {
      // src = _.defaults(src || {});
      src[property] = value;
      return src; // return the same container ...
    }
    else { return value; }
  },
  isSerializable: (self) => {
    return has(self, 'serialize');
  },
  required: (location, fields, options = {}) => {
    (Array.isArray(fields)? fields: [fields]).forEach((field) => {
      if (_.isEmpty(field.value) || _.isNull(field.value)) {
        let msg = `Unexpected ${field.name} @ propterty: ${location}`;
        throw new Error(msg);
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
          stash[_.isNil(val.alias)? name : val.alias] = val.render(self, name)
            || val.default;
        } else {
          stash[_.isNil(val.alias)? name : val.alias] = self[name] || val.default;
        }
      }
    });

    // returns the given cumulator context.
    return stash;
  }
};
