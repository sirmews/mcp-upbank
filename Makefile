# Colors for better visibility
CYAN := \033[36m
GREEN := \033[32m
RED := \033[31m
RESET := \033[0m

## start-dev: Start the development server with inspector
start-dev:
	bunx @modelcontextprotocol/inspector bun run .

## build-executable: Build the project into an executable
build-executable:
	bun build --compile --minify --sourcemap --bytecode ./src/main.ts --outfile upbank-mcp

## orval: Run the OpenAPI generator
orval:
	rm -rf src/gen
	bunx orval
	./scripts/fix-orval-import.sh

## run-dev: Run the development server
run-dev:
	bunx @modelcontextprotocol/inspector bun run src/main.ts

## help: Show a list of commands
help : Makefile
	@echo "Usage:"
	@echo "  make $(CYAN)<target>$(RESET)"
	@echo ""
	@echo "Targets:"
	@awk '/^[a-zA-Z\-_0-9%:\\]+/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = $$1; \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			gsub("\\\\", "", helpCommand); \
			gsub(":+$$", "", helpCommand); \
			printf "  $(CYAN)%-20s$(RESET) %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)


.PHONY: all help