import { z } from "zod";
import type {
	ListAccountsResponse,
	ListAttachmentsResponse,
	ListCategoriesResponse,
	ListTagsResponse,
	ListTransactionsResponse,
} from "./gen/schemas";
import { customFetcher } from "./mutator/fetch";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const paginationUrlParams = z
	.object({
		url: z
			.string()
			.url()
			.describe(
				"The pagination URL (prev or next) from a previous API response.",
			),
	})
	.describe("Input for fetching data from a pagination URL");

export const getPaginatedResourceHandler = async <T>(
	params: z.infer<typeof paginationUrlParams>,
): Promise<T> => {
	const response = await customFetcher<T>(params.url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};

export const getPaginatedAccountsWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListAccountsResponse> => {
	const rawData =
		await getPaginatedResourceHandler<ListAccountsResponse>(params);
	return rawData;
};

export const getPaginatedTransactionsWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListTransactionsResponse> => {
	const rawData =
		await getPaginatedResourceHandler<ListTransactionsResponse>(params);
	return rawData;
};

export const getPaginatedAccountTransactionsWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListTransactionsResponse> => {
	const rawData =
		await getPaginatedResourceHandler<ListTransactionsResponse>(params);
	return rawData;
};

export const getPaginatedAttachmentsWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListAttachmentsResponse> => {
	const rawData =
		await getPaginatedResourceHandler<ListAttachmentsResponse>(params);
	return rawData;
};

export const getPaginatedTagsWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListTagsResponse> => {
	const rawData = await getPaginatedResourceHandler<ListTagsResponse>(params);
	return rawData;
};

export const getPaginatedCategoriesWrapper = async (
	params: z.infer<typeof paginationUrlParams>,
): Promise<ListCategoriesResponse> => {
	const rawData =
		await getPaginatedResourceHandler<ListCategoriesResponse>(params);
	return rawData;
};

export const paginationHandlers = {
	getPaginatedAccountsWrapper,
	getPaginatedTransactionsWrapper,
	getPaginatedAccountTransactionsWrapper,
	getPaginatedAttachmentsWrapper,
	getPaginatedTagsWrapper,
};

/**
 * Register pagination tools with the server.
 */
export const registerPaginationTools = (server: McpServer) => {
	for (const [key, handler] of Object.entries(paginationHandlers)) {
		server.tool(
			key,
			`Paginate ${key}`,
			{
				queryParams: paginationUrlParams,
			},
			async (args) => {
				const result = await handler(args.queryParams);
				return {
					content: [{ type: "text", text: JSON.stringify(result) }],
				};
			},
		);
	}
};
