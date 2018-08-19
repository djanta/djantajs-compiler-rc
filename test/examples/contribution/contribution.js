'use strict';

/**
 * Simple porte level annotation class
 *
 * @contribution(name="MyQuotationPorteAtClass",
 *  portes=[@extension(plugin="my-car-rentalservice", name="quote",
 *  description="This's my car quotation rental contribution", version="1.0.0")]
 *  , options={any: "This's my any option"}
 * )
 *
 * @type {MySamplePorte}
 */
module.exports = class MySamplePorte {

  /**
   * Qualified default class constructor
   */
  constructor() {}

  /**
   * @contribution(
   *  name="MyQuotationPorte",
   *  portes=[@extension(plugin="my-car-rentalservice@1.0.5", name="quote",
   *  description="This's my car quotation rental contribution")],
   *  options={any: "This's my any option"}
   * )
   */
  carQuotationContribution() {}
};
