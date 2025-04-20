/**
 * Really concise way to check if a value is empty
 * @param value
 * @returns
 */
export const isEmpty = (value: unknown) => {
	if (typeof value === "string") {
		return value.trim().length === 0;
	}

	// for some reason LLMs can feed a literal `null` string
	if (value === "null") {
		return true;
	}

	if (Array.isArray(value)) {
		return value.length === 0;
	}

	return value === null || value === undefined;
};
