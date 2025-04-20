import axios, { AxiosError } from "axios";
import {
	UP_API_BASE_URL,
	UP_API_TOKEN,
	UP_API_BASE_URL_PATH,
} from "./constants";

/**
 * Really concise way to check if a value is empty
 * @param value
 * @returns
 */
export const isEmpty = (value: unknown) => {
	// LLMs are silly and sometimes feed a literal `null` string
	if (typeof value === "string") {
		const sanitized = value.trim().toLowerCase();
		return sanitized.length === 0 || sanitized === "null" || sanitized === "[]";
	}

	if (Array.isArray(value)) {
		return value.length === 0;
	}

	return value === null || value === undefined;
};

/**
 * Returns a date in rfc-3339 format
 * @param date
 * @returns
 */
export const formatDate = (date: string) => {
	return new Date(date).toISOString();
};

/**
 * Returns a URL object from a relative path
 * to be used with with the request function
 * @example ```ts
 * const url = getUrl("https://api.up.com.au/api/v1/accounts?since=2024-01-01");
 * // this will return the url: /accounts?since=2024-01-01
 * ```
 * @param url
 * @returns
 */
export const getUrl = (url: string) => {
	const urlObj = new URL(url);
	// get relative path i.e. after the UP_API_BASE_URL_PATH
	// this will get everything after the base url
	const relativePath = urlObj.pathname.replace(UP_API_BASE_URL_PATH, "");
	// add any previous query params
	const completeUrl = `${relativePath}?${urlObj.searchParams.toString()}`;
	return completeUrl;
};

/**
 * Helper function for API requests
 * Headers are set to the UP_API_TOKEN and Accept: application/json
 * @example ```ts
 * // this will fetch all accounts with url: https://api.up.com.au/api/v1/accounts
 * const data = await request("accounts", "GET");
 * ```
 * @param endpoint
 * @param method
 * @param queryParams
 */
export const request = async (
	endpoint: string,
	method = "GET",
	queryParams: Record<string, unknown> = {},
) => {
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
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			console.error("Failed to fetch data:", error.response?.data);
		} else {
			console.error("Failed to fetch data:", error);
		}
		throw error;
	}
};
