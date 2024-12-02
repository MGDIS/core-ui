#!/usr/bin/env bash

echo "v$(pnpm list @playwright/test -r --depth=0 --json | jq -r 'map(select(.devDependencies["@playwright/test"])) | .[0].devDependencies["@playwright/test"].version')-jammy"