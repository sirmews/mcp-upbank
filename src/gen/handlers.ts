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
import { customFetcher } from '../mutator/fetch';
import {
  GetAccountsParams,
  GetCategoriesParams,
  PatchTransactionsTransactionIdRelationshipsCategoryBody,
  GetTagsParams,
  PostTransactionsTransactionIdRelationshipsTagsBody,
  DeleteTransactionsTransactionIdRelationshipsTagsBody,
  GetTransactionsParams,
  GetAccountsAccountIdTransactionsParams
} from './schemas';

import {
  getAccounts,
  getAccountsId,
  getAttachments,
  getAttachmentsId,
  getCategories,
  getCategoriesId,
  patchTransactionsTransactionIdRelationshipsCategory,
  getTags,
  postTransactionsTransactionIdRelationshipsTags,
  deleteTransactionsTransactionIdRelationshipsTags,
  getTransactions,
  getTransactionsId,
  getAccountsAccountIdTransactions
} from './http-client';
  
/**
 * Retrieve a paginated list of all accounts for the currently
authenticated user. The returned list is paginated and can be scrolled
by following the `prev` and `next` links where present.

 * @summary List accounts
 */

export type getAccountsArgs = {
  queryParams: GetAccountsParams;
}

export const getAccountsHandler = async (args: getAccountsArgs) => {
  const res = await getAccounts(args.queryParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a specific account by providing its unique identifier.

 * @summary Retrieve account
 */

export type getAccountsIdArgs = {
  pathParams: {
    id: string
  };
}

export const getAccountsIdHandler = async (args: getAccountsIdArgs) => {
  const res = await getAccountsId(args.pathParams.id);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a list of all attachments. The returned list is [paginated](#pagination) and can
be scrolled by following the `next` and `prev` links where present.

 * @summary List attachments
 */

export const getAttachmentsHandler = async () => {
  const res = await getAttachments();

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a specific attachment by providing its unique identifier.

 * @summary Retrieve attachment
 */

export type getAttachmentsIdArgs = {
  pathParams: {
    id: string
  };
}

export const getAttachmentsIdHandler = async (args: getAttachmentsIdArgs) => {
  const res = await getAttachmentsId(args.pathParams.id);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a list of all categories and their ancestry. The returned list
is not paginated.

 * @summary List categories
 */

export type getCategoriesArgs = {
  queryParams: GetCategoriesParams;
}

export const getCategoriesHandler = async (args: getCategoriesArgs) => {
  const res = await getCategories(args.queryParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a specific category by providing its unique identifier.

 * @summary Retrieve category
 */

export type getCategoriesIdArgs = {
  pathParams: {
    id: string
  };
}

export const getCategoriesIdHandler = async (args: getCategoriesIdArgs) => {
  const res = await getCategoriesId(args.pathParams.id);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Updates the category associated with a transaction. Only transactions
for which `isCategorizable` is set to true support this operation. The
`id` is taken from the list exposed on `/categories` and cannot be one of
the top-level (parent) categories. To de-categorize a transaction, set
the entire `data` key to `null`. An HTTP `204` is returned on success.
The associated category, along with its request URL is also exposed via
the `category` relationship on the transaction resource returned from
`/transactions/{id}`.

 * @summary Categorize transaction
 */

export type patchTransactionsTransactionIdRelationshipsCategoryArgs = {
  pathParams: {
    transactionId: string
  };
  bodyParams: UpdateTransactionCategoryRequest;
}

export const patchTransactionsTransactionIdRelationshipsCategoryHandler = async (args: patchTransactionsTransactionIdRelationshipsCategoryArgs) => {
  const res = await patchTransactionsTransactionIdRelationshipsCategory(args.pathParams.transactionId, args.bodyParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a list of all tags currently in use. The returned list is
[paginated](#pagination) and can be scrolled by following the `next`
and `prev` links where present. Results are ordered lexicographically.
The `transactions` relationship for each tag exposes a link
to get the transactions with the given tag.

 * @summary List tags
 */

export type getTagsArgs = {
  queryParams: GetTagsParams;
}

export const getTagsHandler = async (args: getTagsArgs) => {
  const res = await getTags(args.queryParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Associates one or more tags with a specific transaction. No more than 6
tags may be present on any single transaction. Duplicate tags are
silently ignored. An HTTP `204` is returned on success. The associated
tags, along with this request URL, are also exposed via the `tags`
relationship on the transaction resource returned from
`/transactions/{id}`.

 * @summary Add tags to transaction
 */

export type postTransactionsTransactionIdRelationshipsTagsArgs = {
  pathParams: {
    transactionId: string
  };
  bodyParams: UpdateTransactionTagsRequest;
}

export const postTransactionsTransactionIdRelationshipsTagsHandler = async (args: postTransactionsTransactionIdRelationshipsTagsArgs) => {
  const res = await postTransactionsTransactionIdRelationshipsTags(args.pathParams.transactionId, args.bodyParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Disassociates one or more tags from a specific transaction. Tags that are
not associated are silently ignored. An HTTP `204` is returned on
success. The associated tags, along with this request URL, are also
exposed via the `tags` relationship on the transaction resource returned
from `/transactions/{id}`.

 * @summary Remove tags from transaction
 */

export type deleteTransactionsTransactionIdRelationshipsTagsArgs = {
  pathParams: {
    transactionId: string
  };
  bodyParams: UpdateTransactionTagsRequest;
}

export const deleteTransactionsTransactionIdRelationshipsTagsHandler = async (args: deleteTransactionsTransactionIdRelationshipsTagsArgs) => {
  const res = await deleteTransactionsTransactionIdRelationshipsTags(args.pathParams.transactionId, args.bodyParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a list of all transactions across all accounts for the currently
authenticated user. The returned list is [paginated](#pagination) and can
be scrolled by following the `next` and `prev` links where present. To
narrow the results to a specific date range pass one or both of
`filter[since]` and `filter[until]` in the query string. These filter
parameters **should not** be used for pagination. Results are ordered
newest first to oldest last.

 * @summary List transactions
 */

export type getTransactionsArgs = {
  queryParams: GetTransactionsParams;
}

export const getTransactionsHandler = async (args: getTransactionsArgs) => {
  const res = await getTransactions(args.queryParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a specific transaction by providing its unique identifier.

 * @summary Retrieve transaction
 */

export type getTransactionsIdArgs = {
  pathParams: {
    id: string
  };
}

export const getTransactionsIdHandler = async (args: getTransactionsIdArgs) => {
  const res = await getTransactionsId(args.pathParams.id);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};

/**
 * Retrieve a list of all transactions for a specific account. The returned
list is [paginated](#pagination) and can be scrolled by following the
`next` and `prev` links where present. To narrow the results to a
specific date range pass one or both of `filter[since]` and
`filter[until]` in the query string. These filter parameters
**should not** be used for pagination. Results are ordered newest first
to oldest last.

 * @summary List transactions by account
 */

export type getAccountsAccountIdTransactionsArgs = {
  pathParams: {
    accountId: string
  };
  queryParams: GetAccountsAccountIdTransactionsParams;
}

export const getAccountsAccountIdTransactionsHandler = async (args: getAccountsAccountIdTransactionsArgs) => {
  const res = await getAccountsAccountIdTransactions(args.pathParams.accountId, args.queryParams);

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(res),
      },
    ],
  };
};
