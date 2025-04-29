#!/usr/bin/env bash

script_name="create-test-files"
temp_dir="temp"

# Make a copy ok package file with specific keys
prepare_package() {
  file=$1
  jq_query=$2
  destination="$temp_dir/$file"
  mkdir -p "$(dirname "$destination")"
  jq "$jq_query" "$file" > "$destination"
  echo "[$script_name] $file added to your project."
}

# Stop Docker
clean() {
  docker compose down
  exit 2
}

# Remove temp directory
rm -rf "$temp_dir"

# Prepare image content
pnpm build "$@"

# Prepare root package.json
prepare_package "package.json" '{
  name, 
  packageManager,
  "scripts": {
    "apps:mg-components": .scripts."apps:mg-components",
    "apps:notification-center": .scripts."apps:notification-center",
    "test:e2e": .scripts."test:e2e"
  }, 
  "devDependencies": { "turbo": .devDependencies.turbo } 
}'

# Prepare packages/mg-components/package.json
prepare_package "packages/mg-components/package.json" '{
  name,
  module: .module, 
  "types": .types, 
  "files": .files, 
  "scripts": { 
    prebuild: .scripts.prebuild,
    start: .scripts.start,
    "test:e2e": .scripts."test:e2e:docker"
  }, 
  "dependencies": { 
    "@mgdis/stencil-helpers": .dependencies."@mgdis/stencil-helpers",
    "@stencil/core": .dependencies."@stencil/core",
    "@popperjs/core": .dependencies."@popperjs/core",
    "quill": .dependencies."quill"
  },
  "devDependencies": { "@mgdis/playwright-helpers": .devDependencies."@mgdis/playwright-helpers" }
}'

# Prepare packages/notification-center/package.json
prepare_package "packages/notification-center/package.json" '{
  name,
  module: .module, 
  "types": .types, 
  "files": .files, 
  "exports": .exports, 
  "scripts": { 
    "test:e2e": .scripts."test:e2e:docker"
  },
  "devDependencies": { "@mgdis/playwright-helpers": .devDependencies."@mgdis/playwright-helpers" }
}'

# Prepare packages/styles/package.json
prepare_package "packages/styles/package.json" '{
  name, 
  "scripts": { "test:e2e": .scripts."test:e2e:docker" },
  "devDependencies": { "@mgdis/playwright-helpers": .devDependencies."@mgdis/playwright-helpers" }
}'

# Prepare apps/notification-center/package.json
prepare_package "apps/notification-center/package.json" '{
  name, 
  "scripts": { dev: .scripts.dev },
  "dependencies": { 
    "@mgdis/mg-components": .dependencies."@mgdis/mg-components",
    "@mgdis/notification-center": .dependencies."@mgdis/notification-center",
  }, 
  "devDependencies": {
    typescript: .devDependencies.typescript,
    vite: .devDependencies.vite,
  }
}'

# Prepare packages/playwright-helpers/package.json
prepare_package "packages/playwright-helpers/package.json" '{
  name, 
  main,
  types
}'


# Prepare packages/mg-components-helpers/package.json
prepare_package "packages/mg-components-helpers/package.json" '{
  name,
}'

# Prepare packages/stencil-helpers/package.json
prepare_package "packages/stencil-helpers/package.json" '{
  name, 
  main,
  types,
  "dependencies": { 
    "@mgdis/mg-components-helpers": .dependencies."@mgdis/mg-components-helpers",
  }
}'

# Create turbo.json
echo '{
  "$schema": "https://turborepo.org/schema.json",
  "globalEnv": ["PLAYWRIGHT_BROWSERS_PATH"],
  "tasks": {
    "test:e2e": {}
  }
}' > "$temp_dir/turbo.json"
echo "[$script_name] turbo.json added to your project."

# Get base image version
script_dir="$(cd "$(dirname "$0")" && pwd)"
baseimage=$("${script_dir}/get-playwright-version.sh")

# Build docker image with passed args
docker build --build-arg baseimage="$baseimage" --build-arg args="$@" --platform linux/amd64 -t coreui-e2e:latest .

echo "Press CTRL + C once tests are finished"

docker compose -f docker-compose.yml up

trap "clean" SIGINT
