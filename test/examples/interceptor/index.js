'use strict';

/**
 * Interceptor the request incoming and
 *
 * @interceptor(name='MyInterceptorTesting', priority='prepare',
 *  order=0, description='Testing interceptor annotation parser'
 * )
 *
 * @type {MyInterceptorTesting}
 */
module.exports = class MyInterceptorTesting {
  /**
   * Qualified default class constructor
   * @constructor
   */
  constructor() {}

  /**
   * Pre-handle the original request.
   *
   * @before(description='Inject the begening time')
   */
  handleBeforeLifecycle(req, res, chain, params, options) {
    // Not yet implemented comment to avoid rule violation
  }

  /**
   * Post-Handle the request.
   *
   * @after(description='Inject the total excecution timeout')
   */
  handleAfterLifecycle(req, res, chain, params, options) {
    // Not yet implemented comment to avoid rule violation
  }
};
