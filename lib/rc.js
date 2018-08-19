'use strict';

let { Handler } = require('djantajs-compiler-core');
let utils = require('./utils');

let _ = require('lodash');
let path = require('path');
let fs = require('fs');

let RC_NAME = '.djanta-rc.json';
let PKG_NAME = 'package.json';

/**
 * Annotation parser handler implementation
 * @type {RC}
 */
module.exports = class RC extends Handler {
  /**
   * Qualified default .djanta-rc.json generator handler.
   * @param {Object} compiler the given compilier instance
   * @constructor
   */
  constructor (compiler) {
    super();
    this._compiler = compiler;
    this._build = {};
  }

  /**
   * Update the current bundle with the given configuration
   * @param {Bundle} bundle the bundle instance where to update from
   * @return {RC} return the bundle generator self instance.
   * @private
   */
  _withBundle(bundle) {
    let self = this;
    if(!_.isNil(bundle)  && 'bundle' === bundle.annotationName) {
      self._bundle = _.merge({}, self._bundle, bundle.serialize);
    }
    return self;
  }

  /**
   * Create and/or update the plugin configuration.
   * @param {Plugin} plugin the plugin where to update from.
   * @param {string} src the scanned file source
   * @return {RC} return the bundle self instance
   * @private
   */
  _withPlugin(plugin, src) {
    let self = this;
    if(!_.isNil(plugin) && 'plugin' === plugin.annotationName) {
      let serialize = _.merge({}, plugin.serialize, { class: src });

      (self._bundle.plugins = self._bundle.plugins || []).push(serialize);

      /*if(_.isNil(self._bundle.plugins)) {
        self._bundle.plugins = [serialize];
      }
      else {
        self._bundle.plugins.push(serialize);
      } */
    }
    return self;
  }

  /**
   * Create and/or update the porte configuration.
   * @param {Porte} component the porte where to update from.
   * @param {string} location the scanned file source
   *
   * @private
   * @return {RC} return the bundle self instance
   */
  _withContribution (component, location) {    let self = this;
    if(component && 'contribution' === component.annotationName) {
      let serialize = _.merge(component.serialize || {}, { class: location });

      (self._bundle.contributions = self._bundle.contributions || []).push(serialize);

      /*if(_.isUndefined(self._bundle.contributions)) {
        self._bundle.contributions = [serialize];
      }
      else {
        self._bundle.contributions.push(serialize);
      }*/
    }
    return self;
  }

  /**
   * Create and/or update the porte configuration.
   * @param {RuntimeLifecycle} component the porte where to update from.
   * @param {string} location the scanned file source
   *
   * @private
   * @return {RC} return the bundle self instance
   */
  _withRuntimeLifecycle(component, location) {
    let self = this;
    if (component && 'runtime' === component.annotationName) {
      let serialize = _.merge(component.serialize || {}, { class: location });

      (self._bundle.lifecycles = (self._bundle.lifecycles || [])).push(serialize);

      /*if (_.isUndefined(self._bundle.lifecycles)) {
        self._bundle.lifecycles = [serialize];
      }
      else {
        self._bundle.lifecycles.push(serialize);
      }*/
    }
    return self;
  }

  /**
   * Create and/or update the resource controller.
   * @param {Porte} component the controller where to update from.
   * @param {string} file the scanned file source
   * @param {string} directory the scanned file source
   *
   * @private
   * @return {RC} return the bundle self instance
   */
  _withController(component, file, directory = __dirname) {
    if(component && ['controller'].indexOf(component.annotationName) !== -1) {
      let self = this;
      switch (component.annotationName) {
        case 'controller':
          (self._build.controllers = self._build.controllers || {})[path.join(directory, file)] = {
            component: component,
            class: file
          };
        break;
      }
    }
  }

  _withInterceptor(component, file, directory = __dirname) {
    if(component && ['interceptor'].indexOf(component.annotationName) !== -1) {
      let self = this;
      switch (component.annotationName) {
        case 'interceptor':
          (self._build.interceptors = self._build.interceptors || {})[path.join(directory, file)] = {
            component: component,
            class: file
          };
        break;
        // Skip default
      }
    }
  }

  /**
   * Internally intialize the top level bundle.
   *
   * @private
   * @return {RC} return the class self instance
   */
  _configure(directory = __dirname) {
    let self = this;
    let origin = path.join(directory, PKG_NAME);

    if(!_.isNil(self._bundle)) {
      return self; // already built!
    }
    else {
      if (fs.statSync(origin).isFile()) {
        self._compiler.logger('Package configuration found at: \'%s\'', origin);

        // JSON.parse(fs.readFileSync(origin, 'utf8'));
        let pkg = require(origin);
        self._bundle = _.defaults({}, {
          package: pkg.name,
          name: pkg.name,
          version: pkg.version,
          description: pkg.description
        }, utils.defaults.bundle);
      }

      self._bundle.creationTime = new Date();
      // self._bundle.generatedBy = OS.userInfo()['username'];
    }
    return self;
  }

  /**
   * Introspect & analyze the bundle configuration
   * @param {object} project the project configuration that should be introspected
   * @param {string} file the scanned file
   * @param {string} directory the scanned file
   * @return {RC} the bundle self instance
   * @private
   */
  _analyze(project, file, directory = __dirname) {
    let self = this;
    [...utils.defaults.retentions].forEach((retention) => {
      switch (retention) {
        case 'classes':
          (project[retention] || []).forEach(component => {
            switch (component.annotationName) {
              case 'bundle':
                self._withBundle(component);
              break;
              case 'plugin':
                self._withPlugin(component, file);
              break;
              case 'contribution':
                self._withContribution(component, file);
              break;
              case 'interceptor':
                self._withInterceptor(component, file, directory);
              break;
              case 'controller':
                self._withController(component, file, directory);
              break;
            }
          });
        break;
        case 'constructors':
          // Not yet supported!
        break;
        case 'methods':
          (project[retention] || []).forEach(component => {
            switch (component.annotationName) {
              case 'hook':
              case 'request':
              case 'response':
              case 'verb':
                let ctrl = (self._build.controllers = self._build.controllers ||
                    {})[path.join(directory, file)];
                let xname = component.target;

                if (!ctrl.methods) {(ctrl.methods = {})[xname] = {};}
                switch(component.annotationName){
                  case 'request':
                  case 'response':
                    let ctn = (ctrl.methods[xname] = ctrl.methods[xname] || {})[component.annotationName];
                    if(!ctn) {
                      ctrl.methods[xname][component.annotationName] = [component];
                    }
                    else {
                      ctn.push(component);
                    }
                  break;
                  default:
                    (ctrl.methods[xname] = ctrl.methods[xname] || {})[component.annotationName] = component;
                }
              break;
              case 'before':
              case 'intercept':
              case 'after':
                let interceptor = (self._build.interceptors = self._build.interceptors || {})[path.join(directory, file)];
                (interceptor.methods = interceptor.methods || {})[component.annotationName] = component;
              break;
              case 'contribution':
                self._withContribution(component, file);
              break;
              case 'runtime':
                self._withRuntimeLifecycle(component, file);
              break;
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

  _finalize () {
    let self = this;
    Object.keys(self._build || {}).forEach(scope => {
      switch(scope) {
        case 'controllers':
          Object.keys(self._build[scope]).forEach((location) => {
            let xconfig = self._build[scope][location], ctrl = xconfig.component;
            if (xconfig.methods && typeof xconfig.methods === 'object') {
              Object.keys(xconfig.methods).forEach((method) => {
                if(xconfig.methods[method].verb) { //only if the method has also been annotated with @verb.
                  ['hook', 'request', 'response'].forEach(nested => {
                    let xvalue = xconfig.methods[method][nested];
                    if(!_.isNil(xvalue)) { xconfig.methods[method].verb.addFearture(nested, xvalue); }
                  });
                  ctrl.addVerb(xconfig.methods[method].verb);
                }
              });
            }
            (self._bundle.resources = self._bundle.resources || []).push(_.merge({}, ctrl.serialize, {class: xconfig.class}));
          });
        break;
        case 'interceptors':
          Object.keys(self._build[scope]).forEach(location => {
            let xconfig = self._build[scope][location], interceptor = xconfig.component;
            if(xconfig.methods && typeof xconfig.methods === 'object') {
              Object.keys(xconfig.methods).forEach(routine => interceptor.routine = xconfig.methods[routine]);
            }

            (self._bundle.interceptors = self._bundle.interceptors || []).push(_.merge({}, interceptor.serialize, {
              class: xconfig.class
            }));
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
   * @return {RC} the bundle rc class self instance
   * @private
   */
  _write(options = {}) {
    try {
      let output = path.join(options.outputDirectory || __dirname, options.outputFile || RC_NAME);
      fs.writeFileSync(output, JSON.stringify(this._bundle, null, parseInt(options.indent)|| 2), { encoding: 'utf8' });
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
  handle(options = {} /* resources = [], buildOutputDirectory, outputFile */) {
    let self = this;
    (options.resources || []).forEach(res => self._configure(res.directory ||
      __dirname)._analyze(res.project, res.src || res.location, res.directory));

    if (self._build) { // finalyze and save onto .djanta-rc.json file ...
      self._finalize()
        ._write(options);
    }
  }
};
