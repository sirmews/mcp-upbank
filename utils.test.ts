// set up bun:test
import { test, expect } from "bun:test";
import { getUrl, isEmpty } from "./utils";
import { UP_API_BASE_URL } from "./constants";

test("getUrl", () => {
	const url = getUrl(`${UP_API_BASE_URL}/accounts?since=2024-01-01`);
	expect(url).toBe("/accounts?since=2024-01-01");
});

test("isEmpty", () => {
	expect(isEmpty(null)).toBe(true);
	expect(isEmpty(undefined)).toBe(true);
	expect(isEmpty("")).toBe(true);
	expect(isEmpty([])).toBe(true);
	expect(isEmpty("null")).toBe(true);
	expect(isEmpty("[]")).toBe(true);
});
