'use strict';

/**
 * Simple bundle level annotation class
 *
 * @plugin(name='my-example-plugin', engine=[">=7.6.0"], version="1.0.1",
 *  imports=["my-other-plugin"], tags=["finance", "trading"],
 *  portes=[@porte(name="cashmanager", enabled=true,
 *  description="Here is the entry point to contribute with your own cashflow managment system"),
 *  @porte(name="quotes", enabled=true,
 *    description="You can join this point to contribute to your own quotation service",
 *    migration=@migration(since="1.0.1", strategy='warming',
 *      message="This porte has been deprecated since the version 1.0.1. Please considere using the door 'quotation instead'",
 *      redirection={service:'OpenQuotationServie', porte:'quoteV2'})
 *  )],
 *  settings=[@setting(name="my-settings-provider", value="this my value",
 *    description="here is describe my setting property")]
 * )
 *
 * @type {MySamplePlugin}
 */
module.exports = class MySamplePlugin {
  /**
   * Qualified default class constructor
   */
  constructor() {}
};
