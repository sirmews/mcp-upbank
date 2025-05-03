#!/bin/sh

FILE="src/gen/http-client.ts"
IMPORT="import { customFetcher } from '../mutator/fetch';"

# Check if the import already exists
if ! grep -qF "$IMPORT" "$FILE"; then
  awk -v import="$IMPORT" '
    BEGIN {inserted=0}
    /^import / && !inserted {print import; inserted=1}
    {print}
    END {if (!inserted) print import}
  ' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"
  echo "customFetcher import added as the first import."
else
  echo "customFetcher import already present."
fi