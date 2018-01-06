'use strict';

const {Handler} = require('djantajs-compiler-core');

const _ = require('lodash');
const Path = require('path');
const FS = require('fs');
const OS = require ('os');

const RC_NAME = '.djanta-rc.json';
const PKG_NAME = 'package.json';

const DEFAULT_AUTHOR = {
  url: 'www.djanta.io',
  name: 'team.infinite@djanta.io',
  email: 'team.infinite@djanta.io'
};

const RETENTIONS = [
  'classes',
  'constructors',
  'properties',
  'methods'
];

module.exports = class RC extends Handler {

  /**
   * Qualified default .djanta-rc.json generator handler
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
    if (!_.isUndefined(bundle) && 'bundle' === bundle.annotationName) {
      if (bundle.name) self._bundle.name = bundle.name;
      if (bundle.version) self._bundle.version = bundle.version;
      if (bundle.description) self._bundle.description = bundle.description;
      if (bundle.homepage) self._bundle.homepage = bundle.homepage;
      if (bundle.author) self._bundle.author = bundle.author;
      if (bundle.order) self._bundle.order = bundle.order;
      if (bundle.enabled) self._bundle.enabled = bundle.enabled;
      if (bundle.tags) self._bundle.tags = bundle.tags;
      if (bundle.imports) self._bundle.imports = bundle.imports;
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
    if (!_.isUndefined(plugin) && 'plugin' === plugin.annotationName) {
      let serialize = _.merge({}, plugin.serialize, {class: src});
      if (_.isUndefined(self._bundle.plugins)) {
        self._bundle.plugins = [serialize];
      }
      else {
        self._bundle.plugins.push(serialize);
      }
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
  _withContribution(component, location) {    let self = this;
    if (component && 'contribution' === component.annotationName) {
      let serialize = _.merge(component.serialize || {}, {class: location});
      if (_.isUndefined(self._bundle.contributions)) {
        self._bundle.contributions = [serialize];
      }
      else {
        self._bundle.contributions.push(serialize);
      }
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
  _withRuntimeLifecycle(component, location) {    let self = this;
    if (component && 'runtime' === component.annotationName) {
      let serialize = _.merge(component.serialize || {}, {class: location});
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
          (self._build.controllers = self._build.controllers || {})[Path.join(directory, file)] = {
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
          (self._build.interceptors = self._build.interceptors || {})[Path.join(directory, file)] = {
            component: component,
            class: file
          };
          break;
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
    let self = this, origin = Path.join(directory, PKG_NAME);

    if (!_.isUndefined(self._bundle)) return self;

    if (FS.statSync(origin).isFile()) {
      self._compiler.logger('Package configuration found at: \'%s\'', origin);

      let pkg = require(origin); //JSON.parse(FS.readFileSync(origin, 'utf8'));

      self._bundle = _.defaults({
        package: pkg.name || '',
        name: pkg.name || '',
        description: pkg.description || '',
        homepage: pkg.homepage || 'www.djanta.io',
        version: pkg.version || '1.0-SNAPSHOT',
        author: pkg.author || DEFAULT_AUTHOR,
        license: pkg.license || 'MIT'
      });
    }
    else {
      self._bundle = {author: DEFAULT_AUTHOR};
    }

    self._bundle.creationTime = new Date();
    //self._bundle.generatedBy = OS.userInfo()['username'];

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
  _analyze (project, file, directory = __dirname) {
    let self = this;
    (RETENTIONS || []).forEach((retention) => {
      switch (retention) {
        case 'classes':
          (project[retention] || []).forEach((component) => {
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
          //Not yet supported!
        break;
        case 'methods':
          (project[retention] || []).forEach((component) => {
            switch (component.annotationName) {
              case 'hook':
              case 'request':
              case 'response':
              case 'verb':
                let ctrl = (self._build.controllers = self._build.controllers || {})[Path.join(directory, file)],
                  xname = component.target;

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
                let interceptor = (self._build.interceptors = self._build.interceptors || {})[Path.join(directory, file)];
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
          //Not yet supported!
        break;
      }
    });

    return self;
  }

  _finalize () {
    let self = this;
    Object.keys(self._build || {}).forEach((scope) => {
      switch (scope) {
        case 'controllers':
          Object.keys(self._build[scope]).forEach((location) => {
            let xconfig = self._build[scope][location], ctrl = xconfig.component;
            if (xconfig.methods && typeof xconfig.methods === 'object') {
              Object.keys(xconfig.methods).forEach((method) => {
                if(xconfig.methods[method].verb) { //only if the method has also been annotated with @verb.
                  ['hook', 'request', 'response'].forEach((nested) => {
                    let xvalue = xconfig.methods[method][nested];
                    if (xvalue) xconfig.methods[method].verb.addFearture(nested, xvalue);
                  });
                  ctrl.addVerb(xconfig.methods[method].verb);
                }
              });
            }

            (self._bundle.resources = self._bundle.resources || []).push(_.merge({}, ctrl.serialize, {class: xconfig.class}));
          });
        break;
        case 'interceptors':
          Object.keys(self._build[scope]).forEach((location) => {
            let xconfig = self._build[scope][location], interceptor = xconfig.component;
            if(xconfig.methods && typeof xconfig.methods === 'object') {
              Object.keys(xconfig.methods).forEach((routine) => interceptor.routine = xconfig.methods[routine]);
            }

            (self._bundle.interceptors = self._bundle.interceptors
              || []).push(_.merge({}, interceptor.serialize, {class: xconfig.class}));
          });
        break;
      }
    });

    return self;
  }

  /**
   * Persist the .djante-rc.json file to the filesystem
   * @return {RC} the bundle rc class self instance
   * @private
   */
  _write(options) {
    try {
      let output = Path.join(options.outputDirectory || __dirname, options.outputFile || RC_NAME);
      FS.writeFileSync(output, JSON.stringify(this._bundle, null, parseInt(options.indent)|| 2), {encoding: 'utf8'});
      delete this._build;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Qualified compiler handler method'
   * @param {Object} options compilation configuration
   */
  handle(options /*resources = [], buildOutputDirectory, outputFile*/) {
    let self = this;
    options.resources || [].forEach(res => self._configure(res.directory || __dirname)
      ._analyze(res.project, res.src || res.location, res.directory)
    );

    if(self._build) { //finalyze and save onto .djanta-rc.json file ...
      self._finalize()
        ._write(options);
    }
  }
};
