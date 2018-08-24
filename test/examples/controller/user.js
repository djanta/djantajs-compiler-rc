'use strict';

/**
 * My Simple resource controller class level annotation
 *
 * @controller(name='user', root='/api/v1/users', model='User')
 *
 * @type {UserController}
 */
module.exports = class UserController {
  /**
   * Qualified default class constructor
   * @constructor
   */
  constructor() {}

  /**
   * Handle the default http verb.
   *
   * @verb(name='GET', url=[@url(value='/:username')], label='Get user by name',
   *  description='Get any user resource that match with the given name')
   *
   * @hook(interceptor='cache', enabled=true,
   *  options={key:'username', cacheName:'RedisKeyMapCache'},
   *  descriptor='Intercept the request and inject data from the cache if available')
   */
  apiHandlerUserByName(req, res, chain, params) {}
};
