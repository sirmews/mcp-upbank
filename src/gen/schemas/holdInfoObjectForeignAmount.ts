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
import type { MoneyObject } from './moneyObject';

/**
 * The foreign currency amount of this transaction while in the `HELD`
status. This field will be `null` for domestic transactions. The amount
was converted to the AUD amount reflected in the `amount` field.

 * @nullable
 */
export type HoldInfoObjectForeignAmount = MoneyObject | null;
