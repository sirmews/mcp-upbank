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
import type { AttachmentResourceAttributes } from './attachmentResourceAttributes';
import type { AttachmentResourceRelationships } from './attachmentResourceRelationships';
import type { AttachmentResourceLinks } from './attachmentResourceLinks';

export interface AttachmentResource {
  /** The type of this resource: `attachments` */
  type: string;
  /** The unique identifier for this attachment.
 */
  id: string;
  attributes: AttachmentResourceAttributes;
  relationships: AttachmentResourceRelationships;
  links?: AttachmentResourceLinks;
}
