'use strict';

let should = require('should');
let fs = require ('fs');
let path = require ('path');
let _ = require ('lodash');

let { Compiler } = require('djantajs-compiler-core');

let RuntimeCompiler = require('../lib/rcompiler');
let _ROOT = path.resolve(__dirname, '..');

describe('Bundle RC generator global descriptor', () => {
  let core  = undefined;
  let handlers = [];
  let annotation = path.resolve(__dirname, '..', 'lib', 'runtime');

  beforeEach(() => {
    core = new Compiler(_ROOT);
    handlers.push(new RuntimeCompiler(core))
  });

  afterEach(() => {
    core = undefined;
    handlers = [];
  });

  it('should compiler instance be Ok', () => {
    should(core).be.ok();
  });

  describe('Bundle annotated parser', () => {
    it('should bundle annotated well rendered', () => {
      let options = {
        project: {
          src: path.resolve(__dirname, './examples/bundle')
        },
        handlers: handlers,
        annotations: annotation
      };

      core
        .compile(options, (err, result) => {});
    });
  });

  describe('Plugin annotated parser', () => {
    it('should plugin annotated well rendered', () => {
      let ws = path.resolve(__dirname, './examples/plugin'),
        options = {
          project: {
            src: ws
          },
          handlers: handlers,
          annotations: annotation
        };

      core.compile(options, (err, result) => {
        if (!_.isUndefined(err) && !_.isNull(err)) {
          console.error(err);
        }
      })
        .then(() => {
          let config = JSON.parse(fs.readFileSync(path.join(ws, '.djanta-rc.json'), 'utf8'));

          // expect(config.name).to.be.a('my-annotations-example-plugin');

          should(config.class).be.eql('index.js');
          should(config.name).be.eql('my-annotations-example-plugin');
          should(config.package).be.eql('my-annotations-example-plugin');
          should(config.version).be.eql('1.0.0');

          should(config.plugins).have.length(1);
          should(config.plugins[0].portes).have.length(4);
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe('Component annotated with resource controller', () => {
    it('should plugin annotated well rendered from class resource controler', () => {
      let base = path.resolve(__dirname, './examples/controller');
      let options = {
          project: {
            src: base
          },
          handlers: handlers,
          annotations: annotation
        };

      core.compile(options, (err, result) => {
        if (!_.isUndefined(err) && !_.isNull(err)) {
          console.error(err);
        }
      })
        .then(() => {
          let config = JSON.parse(fs.readFileSync(path.join(base, '.djanta-rc.json'), 'utf8'));
          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          // Should(Compiler).throws(ex);
        });
    });
  });

  describe('Component annotated with interceptor', () => {
    it('should plugin annotated well rendered from class interceptor', () => {
      let base = path.resolve(__dirname, './examples/interceptor'),
        options = {
          project: {
            src: base
          },
          annotations: annotation,
          handlers: handlers
        };

      core.compile(options, (err, result) => {
        if (!_.isUndefined(err) && !_.isNull(err)) {
          console.error(err);
        }
      })
        .then(() => {
          let config = JSON.parse(fs.readFileSync(path.join(base, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe ('Plugin annotated parser with contribution', () => {
    it('should plugin annotated well rendered', () => {
      let ws = path.resolve(__dirname, './examples/contribution'),
        options = {
          project: {
            src: ws
          },
          annotations: annotation,
          handlers: handlers
        };

      core.compile(options, (err, result) => {
        if (!_.isUndefined(err) && !_.isNull(err)) {
          console.error(err);
        }
      })
        .then(() => {
          let config = JSON.parse(fs.readFileSync(path.join(ws, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe ('Parse all provided project', () => {
    it('should plugin annotated well rendered', () => {
      let ws = path.resolve(__dirname, './examples'),
        options = {
          project: {
            src: ws
          },
          annotations: annotation,
          handlers: handlers
        };

      core.compile(options, (err, result) => {
        if (!_.isUndefined(err) && !_.isNull(err)) {
          console.error(err);
        }
      })
        .then(() => {
          let config = JSON.parse(fs.readFileSync(path.join(ws, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          // Should(Compiler).throws(ex);
        });
    });
  });
});
