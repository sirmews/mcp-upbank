export const UP_API_BASE_URL_PATH = "/api/v1";
export const UP_API_BASE_URL = `https://api.up.com.au${UP_API_BASE_URL_PATH}`;
export const UP_API_TOKEN = process.env.UP_API_TOKEN;

if (!UP_API_TOKEN) {
	throw new Error("UP_API_TOKEN is not set");
}
