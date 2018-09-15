'use strict';

/**
 * Testing dashboard controller
 *
 * @controller(name='dashboard', root='/api/v1/dashboards', model='Dashboard',
 *  hook=[@hook(interceptor='acl', enabled=true, description='Controller hook',
 *    options={role:['admin', 'system', 'SU']})]
 * )
 *
 * @type {DashboardController}
 */
module.exports = class DashboardController {
  /**
   * Qualified default class constructor.
   * @constructor
   */
  constructor() {
    // NYI
  }

  /**
   * Handle the default http verb.
   *
   * @verb(name='GET', url=[@url(value='/:uuid/settings', params={uuid: {oid:true}})],
   *   label='Load the current dashboard setting',
   *   description='Load the current session dashboard settings'
   * )
   *
   *
   * @hook(interceptor='cache', enabled=true,
   *  options={key:'uuid', cacheName:'DashboardCache'},
   *  descriptor='Intercept the request and load the current dashboard')
   */
  apiHandleSettingLoader(req, res, chain, params) {
    // NYI
  }
};
