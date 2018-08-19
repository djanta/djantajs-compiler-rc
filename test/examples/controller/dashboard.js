'use strict';

/**
 * My Resource that'll request an ACL validation.
 *
 * @controller(name='dashboard', root='/api/v1/dashboards', model='Dashboard',
 *  hook=@hook(interceptor='acl', enabled=true,
 *    description='Accessing the dashboard will required an ACL validation
 * for all resouorces exported by this controller',
 *    options={role:['admin', 'system', 'SU']})
 * )
 *
 * @type {MyUserAclRestrictedResource}
 */
module.exports = class MyUserAclRestrictedResource {
  /**
   * Qualified default class constructor.
   * @constructor
   */
  constructor() {}

  /**
   * Handle the default http verb.
   *
   * @verb(name='GET', url=[@url(value='/:oid/settings', params=[])],
   *  label='Load the current dashboard settings',
   *  description='Load the current session dashboard settings')
   *
   * @hook(interceptor='cache', enabled=true,
   *  options={key:'oid', cacheName:'DashboardCache'},
   *  descriptor='Intercept the request and load the current dashboard')
   */
  apiLoadSettings(req, res, chain, params) {}
};
