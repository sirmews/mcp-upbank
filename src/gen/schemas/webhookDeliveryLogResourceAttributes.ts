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
import type { WebhookDeliveryLogResourceAttributesRequest } from './webhookDeliveryLogResourceAttributesRequest';
import type { WebhookDeliveryLogResourceAttributesResponse } from './webhookDeliveryLogResourceAttributesResponse';
import type { WebhookDeliveryStatusEnum } from './webhookDeliveryStatusEnum';

export type WebhookDeliveryLogResourceAttributes = {
  /** Information about the request that was sent to the webhook URL.
 */
  request: WebhookDeliveryLogResourceAttributesRequest;
  /**
   * Information about the response that was received from the webhook URL.

   * @nullable
   */
  response: WebhookDeliveryLogResourceAttributesResponse;
  /** The success or failure status of this delivery attempt.
 */
  deliveryStatus: WebhookDeliveryStatusEnum;
  /** The date-time at which this log entry was created.
 */
  createdAt: string;
};
