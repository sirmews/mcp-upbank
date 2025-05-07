import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register Up Bank prompts with the server.
 */
export const registerUpBankPrompts = (server: McpServer) => {
	// Transaction Summary Prompt
	server.prompt(
		"transaction-summary",
		{
			period: z.enum([
				"today",
				"yesterday",
				"this-week",
				"this-month",
				"custom",
			]),
			startDate: z
				.string()
				.optional()
				.describe("Start date in YYYY-MM-DD format (for custom period)"),
			endDate: z
				.string()
				.optional()
				.describe("End date in YYYY-MM-DD format (for custom period)"),
			account: z
				.string()
				.optional()
				.describe("Account ID to filter transactions"),
			category: z
				.string()
				.optional()
				.describe("Category to filter transactions"),
		},
		({ period, startDate, endDate, account, category }) => {
			const timeframe = getTimeframe(period, startDate, endDate);

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Show me a summary of my Up Bank transactions ${timeframe}${account ? ` for account ${account}` : ""}${category ? ` in category ${category}` : ""}. Include total spending, number of transactions, and identify any unusual transactions or patterns.`,
						},
					},
				],
			};
		},
	);

	server.prompt(
		"account-overview",
		{
			accountType: z
				.enum(["all", "TRANSACTIONAL", "SAVER"])
				.optional()
				.describe("Filter by account type"),
		},
		({ accountType }) => {
			const accountTypeText = accountType ? ` of type ${accountType}` : "all";

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Give me an overview of my Up Bank accounts${accountTypeText}. Include account names, balances, and any relevant details about each account.`,
						},
					},
				],
			};
		},
	);

	// Spending Forecast Prompt
	server.prompt(
		"spending-forecast",
		{
			forecastDays: z
				.string()
				.optional()
				.describe("Number of days to forecast"),
		},
		({ forecastDays }) => {
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Based on my recent transaction history, forecast my expected spending for the next ${forecastDays} days. Break this down by category and identify any expected large expenses or recurring payments.`,
						},
					},
				],
			};
		},
	);
};

/**
 * Get the timeframe for the transaction summary prompt.
 */
function getTimeframe(
	period: string,
	startDate?: string,
	endDate?: string,
): string {
	if (period === "custom" && startDate && endDate) {
		return `from ${startDate} to ${endDate}`;
	}
	return period;
}
