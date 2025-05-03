FROM oven/bun:1 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Final image
FROM oven/bun:1-slim

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Run the server
CMD ["bun", "dist/main.js"]