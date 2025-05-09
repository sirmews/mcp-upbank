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

import {
  McpServer
} from '@modelcontextprotocol/sdk/server/mcp.js';
  
import {
  StdioServerTransport
} from '@modelcontextprotocol/sdk/server/stdio.js';  

import {
  getAccountsHandler,
  getAccountsIdHandler,
  getAttachmentsHandler,
  getAttachmentsIdHandler,
  getCategoriesHandler,
  getCategoriesIdHandler,
  patchTransactionsTransactionIdRelationshipsCategoryHandler,
  getTagsHandler,
  postTransactionsTransactionIdRelationshipsTagsHandler,
  deleteTransactionsTransactionIdRelationshipsTagsHandler,
  getTransactionsHandler,
  getTransactionsIdHandler,
  getAccountsAccountIdTransactionsHandler
} from './handlers';
import {
  getAccountsQueryParams,
  getAccountsIdParams,
  getAttachmentsIdParams,
  getCategoriesQueryParams,
  getCategoriesIdParams,
  patchTransactionsTransactionIdRelationshipsCategoryParams,
  patchTransactionsTransactionIdRelationshipsCategoryBody,
  getTagsQueryParams,
  postTransactionsTransactionIdRelationshipsTagsParams,
  postTransactionsTransactionIdRelationshipsTagsBody,
  deleteTransactionsTransactionIdRelationshipsTagsParams,
  deleteTransactionsTransactionIdRelationshipsTagsBody,
  getTransactionsQueryParams,
  getTransactionsIdParams,
  getAccountsAccountIdTransactionsParams,
  getAccountsAccountIdTransactionsQueryParams
} from './tool-schemas.zod';

const server = new McpServer({
  name: 'upAPIServer',
  version: '1.0.0',
});


server.tool(
  'getAccounts',
  'List accounts',
  {
    queryParams: getAccountsQueryParams
  },
  getAccountsHandler
);

server.tool(
  'getAccountsId',
  'Retrieve account',
  {
    pathParams: getAccountsIdParams
  },
  getAccountsIdHandler
);

server.tool(
  'getAttachments',
  'List attachments',
  getAttachmentsHandler
);

server.tool(
  'getAttachmentsId',
  'Retrieve attachment',
  {
    pathParams: getAttachmentsIdParams
  },
  getAttachmentsIdHandler
);

server.tool(
  'getCategories',
  'List categories',
  {
    queryParams: getCategoriesQueryParams
  },
  getCategoriesHandler
);

server.tool(
  'getCategoriesId',
  'Retrieve category',
  {
    pathParams: getCategoriesIdParams
  },
  getCategoriesIdHandler
);

server.tool(
  'patchTransactionsTransactionIdRelationshipsCategory',
  'Categorize transaction',
  {
    pathParams: patchTransactionsTransactionIdRelationshipsCategoryParams,
    bodyParams: patchTransactionsTransactionIdRelationshipsCategoryBody
  },
  patchTransactionsTransactionIdRelationshipsCategoryHandler
);

server.tool(
  'getTags',
  'List tags',
  {
    queryParams: getTagsQueryParams
  },
  getTagsHandler
);

server.tool(
  'postTransactionsTransactionIdRelationshipsTags',
  'Add tags to transaction',
  {
    pathParams: postTransactionsTransactionIdRelationshipsTagsParams,
    bodyParams: postTransactionsTransactionIdRelationshipsTagsBody
  },
  postTransactionsTransactionIdRelationshipsTagsHandler
);

server.tool(
  'deleteTransactionsTransactionIdRelationshipsTags',
  'Remove tags from transaction',
  {
    pathParams: deleteTransactionsTransactionIdRelationshipsTagsParams,
    bodyParams: deleteTransactionsTransactionIdRelationshipsTagsBody
  },
  deleteTransactionsTransactionIdRelationshipsTagsHandler
);

server.tool(
  'getTransactions',
  'List transactions',
  {
    queryParams: getTransactionsQueryParams
  },
  getTransactionsHandler
);

server.tool(
  'getTransactionsId',
  'Retrieve transaction',
  {
    pathParams: getTransactionsIdParams
  },
  getTransactionsIdHandler
);

server.tool(
  'getAccountsAccountIdTransactions',
  'List transactions by account',
  {
    pathParams: getAccountsAccountIdTransactionsParams,
    queryParams: getAccountsAccountIdTransactionsQueryParams
  },
  getAccountsAccountIdTransactionsHandler
);

const transport = new StdioServerTransport();

server.connect(transport).then(() => {
  console.error('MCP server running on stdio');
}).catch(console.error);
