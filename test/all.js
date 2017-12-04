'use strict';

const should = require('should');

const FS = require ('fs');
const Path = require ('path');
const _ = require ('lodash');

const { Compiler } = require('djantajs-compiler-core');

const RC = require('../lib/rc');
const _ROOT = Path.resolve(__dirname, '..');

describe('Bundle RC generator global descriptor', () => {
  let core  = undefined, handlers = [], annotation = Path.resolve(__dirname, '..', 'lib', 'runtime');

  beforeEach(() => {
    core = new Compiler(_ROOT);
    handlers.push(new RC(core))
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
          src: Path.resolve(__dirname, '../examples/package')
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
      let ws = Path.resolve(__dirname, '../examples/plugins'),
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
          let config = JSON.parse(FS.readFileSync(Path.join(ws, '.djanta-rc.json'), 'utf8'));

          //expect(config.name).to.be.a('my-annotations-example-plugin');

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
      let base = Path.resolve(__dirname, '../examples/controller'),
        options = {
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
          let config = JSON.parse(FS.readFileSync(Path.join(base, '.djanta-rc.json'), 'utf8'));
          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe('Component annotated with interceptor', () => {
    it('should plugin annotated well rendered from class interceptor', () => {
      let base = Path.resolve(__dirname, '../examples/interceptor'),
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
          let config = JSON.parse(FS.readFileSync(Path.join(base, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe ('Plugin annotated parser with contribution', () => {
    it('should plugin annotated well rendered', () => {
      let ws = Path.resolve(__dirname, '../examples/contribution'),
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
          let config = JSON.parse(FS.readFileSync(Path.join(ws, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });

  describe ('Parse all provided project', () => {
    it('should plugin annotated well rendered', () => {
      let ws = Path.resolve(__dirname, '../examples'),
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
          let config = JSON.parse(FS.readFileSync(Path.join(ws, '.djanta-rc.json'), 'utf8'));

          should(config.class).be.eql('index.js');
        })
        .catch((ex) => {
          //Should(Compiler).throws(ex);
        });
    });
  });
});
