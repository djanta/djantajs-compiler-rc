'use strict';

/**
 * @type {RuntimeLifecycle}
 */
module.exports = class RuntimeLifecycle {

  /**
   * Qualified default class constructor
   */
  constructor() {}

  /**
   * @runtime(event=['beforeServerStopped'],
   *  enabled=true, async=true, ttl=300,
   *  description='Handle the core server after stopped event'
   * )
   */
  handleBeforeServerStopped(event = undefined){}

  /**
   * @runtime(event=['beforeServerStarted'],
   *  enabled=true, async=true, ttl=300,
   *  description='Handle the core server before start event'
   * )
   */
  handleBeforeServerStarted(event = undefined){}
};
