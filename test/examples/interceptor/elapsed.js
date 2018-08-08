'use strict';

/**
 * Interceptor the request incoming and
 *
 * @interceptor(name='ElapsedTimer', priority='prepare', order='-1', description='Elapsed time injector')
 *
 * @type {ElaspedInjector}
 */
module.exports = class ElaspedInjector {

  /**
   * Qualified default class constructor
   */
  constructor() {}

  /**
   * Pre-handle the original request.
   *
   * @before(description='Inject the begening time')
   */
  before(req, res, chain, params, options) {
  }

  /**
   * Process the request ..
   *
   * @intercept(description='Intercept and inject some additional headers ...')
   */
  perform(req, res, chain, params) {}

  /**
   * Post-Handle the request.
   *
   * @after(description='Inject the total excecution timeout')
   */
  after(req, res, chain, params, options) {}
};
