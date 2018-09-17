'use strict';

let fs = require('fs');
let utils = require('./utils');
let _ = require('lodash');
let path = require('path');
let { Handler } = require('@djanta/djantajs-compiler-core');

const cloader = require;
const RC_NAME = '.djanta-rc.json';
const PKG_NAME = 'package.json';

// default annotation class map renderer ...
const render = (an, file, cwd = __dirname) => _.defaults({
  component: an,
  class: file
});

// serialize the given annotation into the source object ...
const serialize = (src, an, file) => {
  if (utils.isSerializable(an)) {
    src = utils.concat(src, _.merge(an.serialize || {}, { class: file }));
  }
  return src;
};

// Annotation builder context mapping configuration ...
const mapping = {
  plugin: {
    context: 'bundle',
    alias: 'plugins'
  },
  contribution: {
    alias: 'contributions',
    context: 'bundle'
  },
  runtime: {
    alias: 'lifecycles',
    context: 'bundle'
  },
  controller: {
    alias: 'controllers',
    serializer: render,
    context: 'build',
    value: _.defaults({})
  },
  interceptor: {
    serializer: render,
    context: 'build',
    alias: 'interceptors',
    value: _.defaults({}),
  }
};

/**
 * Annotation parser handler implementation
 * @type {RuntimeCompiler}
 */
module.exports = class RuntimeCompiler extends Handler {
  /**
   * Qualified default .djanta-rc.json generator handler.
   * @param {Object} compiler the given compilier instance
   * @constructor
   */
  constructor (compiler) {
    super();
    this._compiler = compiler;
    this._build = _.defaults({});
  }

  /**
   * Gets the compiler build context.
   * @return {*} Returns the compilation context.
   */
  get build () {
    return _.isNil(this._build) ?
      this._build = _.defaults({}):
      this._build;
  }

  /**
   * Gets the provided bundle compiler
   * @return {Object|*} Returns the user provided compiler
   */
  get compiler () { return this._compiler; }

  /**
   * Gets the module bundle configuration
   * @return {{}|undefined} Returns the bundle configuration
   */
  get bundle () { return this._bundle; }

  /**
   * Update the current bundle with the given configuration
   * @param {Bundle} bundle the bundle instance where to update from
   * @return {RuntimeCompiler} return the bundle generator self instance.
   * @private
   */
  _withBundle (bundle) {
    let self = this;
    if(!_.isNil(bundle)  && 'bundle' === bundle.annotationName) {
      self._bundle = _.merge({}, self.bundle || {}, bundle.serialize);
    }
    return self;
  }

  /**
   * Build any abstract given annotated component.
   *
   * @param {{}} ann the controller where to update from.
   * @param {string} file the scanned file source
   * @param {string} cwd the scanned file source
   * @return {RuntimeCompiler}
   * @private
   */
  _with (ann, file, cwd = __dirname) {
    let self = this;
    let m = mapping[ann.annotationName];
    let serializer = () => utils.isSerializable(ann) ?
      _.merge({}, ann.serialize, { class: file }) :
      undefined;

    if (!_.isNil(m)) {
      let context = m.context || 'bundle';
      let loc = path.join(cwd, file); // file absolute path ...

      // bind the given maping context ...
      self[context][m.alias] = utils.concat(self[context][m.alias] ||
        m.value || [], _.isFunction(m.serializer) ?
          m.serializer(ann, file, cwd) :
          serializer(), loc);
    }
    return self;
  }

  /**
   * Create and/or update the plugin configuration.
   * @param {Plugin} component the plugin where to update from.
   * @param {string} file the scanned file source
   * @return {RuntimeCompiler} return the bundle self instance
   * @private
   */
  _withPlugin (component, file) {
    let self = this;
    if (!_.isNil(component) && 'plugin' === component.annotationName) {
      let serialize = _.merge({}, component.serialize, { class: file });
      self.bundle.plugins = utils.concat(self.bundle.plugins, serialize);
    }
    return self;
  }

  /**
   * Internally intialize the top level bundle.
   *
   * @param {string} cwd the given base working directory
   * @private
   * @return {RuntimeCompiler} return the class self instance
   */
  _configure (cwd = __dirname) {
    let self = this;
    let fd = path.join(cwd, PKG_NAME);

    if(!_.isNil(self.bundle)) {
      return self; // Has been already built!
    }
    else {
      if (fs.statSync(fd).isFile()) {
        self.compiler.logger('Package configuration found at: \'%s\'', fd);

        // JSON.parse(fs.readFileSync(fd, 'utf8'));
        let pkg = cloader(fd);
        self._bundle = _.defaults({
          package: pkg.name,
          name: pkg.name,
          version: pkg.version,
          description: pkg.description
        }, utils.defaults.bundle);
      }

      self.bundle.creationTime = new Date();
      // self.bundle.generatedBy = OS.userInfo()['username'];
    }
    return self;
  }

  /**
   * Introspect & analyze the bundle configuration
   * @param {object} project the project configuration that should be introspected
   * @param {string} file the scanned file
   * @param {string} cwd the scanned file
   * @return {RuntimeCompiler} the bundle self instance
   * @private
   */
  _analyze (project, file, cwd = __dirname) {
    let self = this;
    let loc = path.join(cwd, file);

    [...utils.defaults.retentions].forEach((retention) => {
      switch (retention) {
        case 'classes':
          _.each([...project[retention] || []], (an) => {
            let aname = an.annotationName;
            if (!!~utils.defaults.group.classes.indexOf(aname)) {
              self._withBundle(an)
                ._with(an, file, cwd);
            }
          });
        break;
        case 'constructors':
          // Not yet supported!
        break;
        case 'methods':
          _.each([...project[retention] || []], (an) => {
            let name = an.annotationName, target = an.target;
            switch (name) {
              case 'hook':
              case 'request':
              case 'response':
              case 'verb':
                let ctrl = self.build.controllers[loc];

                ctrl.methods = !_.isNil(ctrl.methods) ? ctrl.methods : {};
                ctrl.methods = utils.concat(ctrl.methods, ctrl.methods[target]
                  || {}, target);

                if (!!~['request', 'response'].indexOf(name)) {
                  ctrl.methods[target][name] = utils.concat(ctrl.methods[target]
                    [name] || [], an);
                }
                else {
                  ctrl.methods[target] = utils.concat(ctrl.methods[target] ||
                    _.defaults({}), an, name);
                }
              break;
              case 'before':
              // case 'intercept':
              case 'after':
                if (!_.isNil(self.build.interceptors[loc])) {
                  self.build.interceptors[loc].methods = utils.concat(self.build
                    .interceptors[loc].methods || {}, an, name);
                }
              break;
              case 'runtime':
                self.bundle.lifecycles = serialize(self.bundle.lifecycles,
                  an, file);
              break;
              case 'contribution':
                self.bundle.contributions = serialize(self.bundle.contributions,
                  an, file);
              break;
              // Skip default
            }
          });
        break;
        case 'properties':
          // Not yet supported!
        break;
        // Skip default
      }
    });
    return self;
  }

  /**
   * Finalize the context build state.
   * @return {RuntimeCompiler}
   * @private
   */
  _finalize () {
    let self = this;
    _.each(self.build || {}, (context, name) => {
      switch(name) {
        case 'controllers':
          _.each(context, (an /* , location */) => {
            let ctrl = an.component;
            if (_.isPlainObject(an.methods)) {
              _.each(an.methods, (m) => {
                // only if the method has also been annotated with @verb.
                if (!_.isNil(m.verb)) {
                  _.each(['hook', 'request', 'response'], (decorator) => {
                    if (!_.isNil(m[decorator])) {
                      m.verb.addFeature(decorator, m[decorator]);
                    }
                  });

                  ctrl.addVerb(m.verb); // register the controller verb.
                }
              });
            }
            self.bundle.resources = utils.concat(self.bundle.resources || [],
              _.merge({}, ctrl.serialize, { class: an.class }));
          });
        break;
        case 'interceptors':
          _.each(context, (s) => {
            // prepend the interceptor event routine implementation
            if (_.isPlainObject(s.methods)) {
              _.each(s.methods, (routine) => s.component.routine = routine);
            }

            // concat the interceptor list ...
            self.bundle.interceptors = utils.concat(self.bundle.interceptors,
              _.merge({}, s.component.serialize, { class: s.class }));
          });
        break;
        // Skip default
      }
    });
    return self;
  }

  /**
   * Persist the .djante-rc.json file to the filesystem.
   *
   * @param {{}} options the configuration options
   * @return {RuntimeCompiler} the bundle rc class self instance
   * @throws {Error} throw an error while any unexpected exception happened
   * @private
   */
  _write (options = {}) {
    try {
      // Out put file descriptor ...
      let file = path.join(options.outputDirectory || __dirname,
        options.outputFile || RC_NAME);

      fs.writeFileSync(file, JSON.stringify(this._bundle, null,
          parseInt(options.indent)|| 2), { encoding: 'utf8' });

      // remove the build state holder ...
      delete this._build;
    }
    catch (err) {
      throw err;
    }
  }

  /**
   * Qualified compiler handler method'
   * @param {{}} options compilation configuration
   */
  handle (options = {} /* resources = [], buildOutputDirectory, outputFile */ ){
    let self = this;
    _.each([...options.resources || []], (r) => self._configure(r.directory ||
      __dirname)._analyze(r.project, r.src || r.location, r.directory));

    if (self._build) { // finalyze and save onto .djanta-rc.json file ...
      self._finalize()
        ._write(options);
    }
  }
};
