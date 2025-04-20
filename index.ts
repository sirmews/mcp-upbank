import {
	McpServer,
	ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import { isEmpty } from "./utils.js";
// Constants
const UP_API_BASE_URL = "https://api.up.com.au/api/v1";
const UP_API_TOKEN = process.env.UP_API_TOKEN;

// Helper function for API requests
async function request(
	endpoint: string,
	method = "GET",
	queryParams: Record<string, unknown> = {},
) {
	const url = `${UP_API_BASE_URL}/${endpoint}`;
	try {
		const response = await axios({
			method,
			url,
			headers: {
				Authorization: `Bearer ${UP_API_TOKEN}`,
				Accept: "application/json",
			},
			params: queryParams,
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error;
	}
}

// Initialize server
const server = new McpServer({
	name: "mcp-upbank",
	version: "1.0.0",
});

// example resources
server.resource(
	"listBankAccounts",
	new ResourceTemplate("upbank://{id}", { list: undefined }),
	async (uri, { name }) => ({
		contents: [
			{
				uri: uri.href,
				text: `Hello, ${name}!`,
			},
		],
	}),
);

// Start the server

server.tool(
	"listAccounts",
	{
		accountType: z
			.enum(["SAVER", "TRANSACTIONAL", "HOME_LOAN"])
			.optional()
			.nullable()
			.describe(
				"Optional: Filter accounts by type (SAVER, TRANSACTIONAL, or HOME_LOAN)",
			),
		ownershipType: z
			.enum(["INDIVIDUAL", "JOINT"])
			.nullable()
			.optional()
			.describe(
				"Optional: Filter accounts by ownership type (INDIVIDUAL or JOINT)",
			),
	},
	async (params) => {
		const queryParams: Record<string, any> = {};

		if (!isEmpty(params.accountType)) {
			queryParams["filter[accountType]"] = params.accountType;
		}

		if (!isEmpty(params.ownershipType)) {
			queryParams["filter[ownershipType]"] = params.ownershipType;
		}

		const data = await request("accounts", "GET", queryParams);

		// Format the account data for better readability
		const formattedAccounts = data.data.map((account: any) => ({
			id: account.id,
			name: account.attributes.displayName,
			type: account.attributes.accountType,
			ownershipType: account.attributes.ownershipType,
			balance: {
				value: account.attributes.balance.value,
				currency: account.attributes.balance.currencyCode,
			},
			createdAt: account.attributes.createdAt,
		}));

		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(
						{
							accounts: formattedAccounts,
							total: formattedAccounts.length,
						},
						null,
						2,
					),
				},
			],
		};
	},
);

// Start the server
async function main() {
	try {
		const transport = new StdioServerTransport();
		await server.connect(transport);
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

main();
