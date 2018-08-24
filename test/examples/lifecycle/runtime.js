'use strict';

/**
 * @type {RuntimeLifecycle}
 */
module.exports = class RuntimeLifecycle {
  /**
   * Qualified default class constructor
   * @constructor
   */
  constructor() {}

  /**
   * @runtime(event=['beforeServerStopped'],
   *  enabled=true, async=true, ttl=300,
   *  description='Handle the core server after stopped event'
   * )
   */
  handleBeforeServerStopped(event = undefined){
    // NYI to avoid empty method rule violation
  }

  /**
   * @runtime(event=['beforeServerStarted'],
   *  enabled=true, async=true, ttl=300,
   *  description='Handle the core server before start event'
   * )
   */
  handleBeforeServerStarted(event = undefined){
    // NYI to avoid empty method rule violation
  }
};
