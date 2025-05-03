#!/bin/bash
set -e # Exit on error

# Configuration
APP_NAME="mcp-upbank"
ENTRY_POINT="./src/main.ts"
BUILD_DIR="./dist"
VERSION=$(node -e "console.log(require('./package.json').version || '1.0.0')")

# Create build directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Common build flags
BUILD_FLAGS="--minify --sourcemap"

# Function to build for a specific platform
build_for_platform() {
    local target=$1
    local output_name=$2
    local platform_name=$3
    
    echo "📦 Building for $platform_name..."
    
    bun build "$ENTRY_POINT" \
        --compile \
        $BUILD_FLAGS \
        --target="$target" \
        --outfile="$BUILD_DIR/$output_name"
    
    # Make the executable file executable
    chmod +x "$BUILD_DIR/$output_name"

    echo "✅ Built $platform_name executable: $BUILD_DIR/$output_name"
}

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf "$BUILD_DIR/"*

# Build for each platform
build_for_platform "bun-darwin-arm64" "${APP_NAME}-macos-arm64-v${VERSION}" "macOS ARM64 (Apple Silicon)"
build_for_platform "bun-darwin-x64" "${APP_NAME}-macos-x64-v${VERSION}" "macOS x64 (Intel)"
build_for_platform "bun-linux-x64" "${APP_NAME}-linux-x64-v${VERSION}" "Linux x64"
build_for_platform "bun-linux-arm64" "${APP_NAME}-linux-arm64-v${VERSION}" "Linux ARM64"
build_for_platform "bun-windows-x64" "${APP_NAME}-windows-x64-v${VERSION}.exe" "Windows x64"

# Create zip archives for distribution
echo "📁 Creating zip archives..."
cd "$BUILD_DIR"

for file in *; do
    # Create zip file with the same name
    zip_name="${file}.zip"
    echo "   Zipping $file to $zip_name..."
    zip "$zip_name" "$file"
done

cd ..

echo "🎉 Build completed successfully!"
echo "Executables and zip archives available in $BUILD_DIR"

# Add checksums for security
if command -v sha256sum &> /dev/null; then
    echo "📝 Generating checksums..."
    cd "$BUILD_DIR"
    sha256sum * > checksums.txt
    cd ..
    echo "Checksums saved to $BUILD_DIR/checksums.txt"
fi

echo "
Build Summary:
- Version: $VERSION
- Platforms: macOS (ARM64/x64), Linux (x64/ARM64), Windows (x64)
- Build flags: $BUILD_FLAGS
"