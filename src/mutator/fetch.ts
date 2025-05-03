/**
 * Orval mutator for regular fetch requests with Bearer token from UP_API_TOKEN.
 * Ensures Authorization and Accept headers are set.
 */
export async function customFetcher<T>(url: string, options: RequestInit) {
	const token = process.env.UP_API_TOKEN;
	if (!token) {
		throw new Error("UP_API_TOKEN is not set in environment variables.");
	}

	// Merge headers, ensuring Authorization and Accept are set
	const mergedHeaders = {
		...options.headers,
		Authorization: `Bearer ${token}`,
		Accept: "application/json",
	};

	return fetch(url, {
		...options,
		headers: mergedHeaders,
	}).then((res) => res.json() as Promise<T>);
}

export default customFetcher;
