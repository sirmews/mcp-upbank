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
import type { NoteObject } from './noteObject';

/**
 * A customer provided note about the transaction.  Can only be provided by Up High subscribers.

 * @nullable
 */
export type TransactionResourceAttributesNote = NoteObject | null;
