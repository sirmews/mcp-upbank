/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Up API
 * The Up API gives you programmatic access to your balances and
transaction data. You can request past transactions or set up
webhooks to receive real-time events when new transactions hit your
account. It’s new, it’s exciting and it’s just the beginning.

 * OpenAPI spec version: v1
 */

/**
 * Provides information about a value of money.

 */
export interface MoneyObject {
  /** The ISO 4217 currency code.
 */
  currencyCode: string;
  /** The amount of money, formatted as a string in the relevant currency.
For example, for an Australian dollar value of $10.56, this field will
be `"10.56"`. The currency symbol is not included in the string.
 */
  value: string;
  /** The amount of money in the smallest denomination for the currency, as a
64-bit integer.  For example, for an Australian dollar value of $10.56,
this field will be `1056`.
 */
  valueInBaseUnits: number;
}
