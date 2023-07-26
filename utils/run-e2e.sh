#!/usr/bin/env bash

function clean() {
  docker compose down
  
  exit 2
}

# prepare image content
pnpm build

docker build --platform linux/amd64 -t coreui-e2e:latest .

echo "Press CTRL + C once tests are finished"

docker compose -f docker-compose.test.yml up

trap "clean" SIGINT
