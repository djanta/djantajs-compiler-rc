'use strict';

const _ = require('lodash');

module.exports.isSerializable = (component) => {
  return component && component.constructor.prototype.hasOwnProperty('serialize');
};

module.exports.required = (component, field, options = {}) => {
  (Array.isArray(field)? field: [field]).forEach((fd) => {
    if (_.isUndefined(fd.value) || _.isEmpty(fd.value) || _.isNull(fd.value)) {
      throw new Error('Unexpected invalid '+ component + ' value at propterty: '+ fd.name);
    }
  });
};
