'use strict';

/**
 * My Simple resource controller class level annotation
 *
 * @controller(name='people', root='/api/v1/peoples', model='People')
 *
 * @type {MyController}
 */
module.exports = class MyController {
  /**
   * Qualified default class constructor.
   * @constructor
   */
  constructor() {}

  /**
   * Handle the default http verb.
   *
   * @verb(name='GET', url='/', label='Get all people',
   *   description='This the endpoint where to retrieve the poeple resources ')
   */
  apiGetVerbHandler(req, res, chain, params) {}

  /**
   * Handle the default http verb.
   *
    @verb(name='GET',
      url=@url(value='/:people', params=[@param(name='people', type='string', required='true')]),
      label='Get the people with the given username',
      description='This the endpoint where to retrieve the people with the user unique identifier'
   )
   */
  apiGetPoepleWithOid(req, res, chain, params) {}

  /**
   * Handle the default http verb.
   *
    @verb(name='POST',
      url='/', label='Create a new poeple with all the required attribute',
      description='This the endpoint where to create the poeple resources through',
      attributes=[@attribute(name='username', defaultValue='alphax',
      description='This property will now reauired from the user post')])
   */
  apiPostWithAttribute(req, res, chain, params) {}

  /**
   * Handle the default http verb.
   *
    @verb(name='POST',
      url='/', label='Create a new poeple with all the required attribute',
      description='This the endpoint where to create the poeple resources through',
      attributes=[@attribute(name='username', defaultValue='alphax',
      description='This property will now reauired from the user post')]
   )
   */
  apiPostWithManyAttributes(req, res, chain, params) {}

  /**
   * Handle the default http verb.
   *
    @verb(name='POST', url='/withrequest',
      label='Create a new poeple with all the required attribute',
      description='This verb will separately provide the request configuration')

    @request(name='MyRequestWithJson', type='application/json',
      description='MyRequest with my mime type')
   */
  apiPostWithTypedRequest(req, res, chain, params) {}

  /**
   * Handle the default http verb.
   *
    @verb(name='POST', url='/withresponse',
      label='Create a new poeple with response 200',
      description='This verb will separately provide the request configuration')

    @response(code='200', type='application/json',
      description='MyRequest with my mime type')
   */
  apiPostWithTypedResponse(req, res, chain, params) {}

  /**
   * Handle POST request with many response code.
   *
    @verb(name='POST', url='/withresponse',
      label='Create a new poeple with response 200 and 201',
      description='This verb will separately provide the request configuration')

    @response(code='200', type='application/json',
      description='MyResponse with code 200 expected')
    @response(code='201', type='application/json',
      description='MyResponse with code 201 expected')
   */
  apiPostWithTypedManyResponses(req, res, chain, params) {}

  /**
   * Handle POST request with many response code.
   *
    @verb(name='POST', url='/withresponseandheader',
      label='Create a new poeple with response 200 and 201',
      description='This verb will separately provide the request configuration')

    @response(code='200', type='application/json',
      description='MyResponse with code 200 expected',
      headers=[@header(name='AuthorizationToken',
      value='alfdkfafadsopfiqwfldkafdsjfaklfdafdfeowqpro')],
      showJsonSchema='true', showJsonSample='true'
    )
   */
  apiPostWithResponsesAndHeader(req, res, chain, params) {}
};
