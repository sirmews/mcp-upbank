// orval.config.js
export default {
	"up-banking": {
		input: {
			target:
				"https://raw.githubusercontent.com/up-banking/api/refs/heads/master/v1/openapi.json",
			filters: {
				mode: "exclude",
				tags: ["Webhooks", "Utility endpoints"],
			},
		},
		output: {
			client: "mcp",
			target: "./src/gen/handlers.ts",
			schemas: "./src/gen/schemas",
			baseUrl: {
				getBaseUrlFromSpecification: true,
			},
			mode: "single", // recommended for mcp
			headers: true,
			override: {
				mutator: {
					path: "./src/mutator/fetch.ts",
					name: "customFetcher",
				},
			},
		},
		hooks: {
			afterAllFilesWrite: "biome lint --write --unsafe",
		},
		clean: true,
	},
};
