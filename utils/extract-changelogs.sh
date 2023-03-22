#!/usr/bin/env bash

# stop if any command fails
set -e

complete_name=$1;

# create merged changelog in temporal markdown file current.md
printf '## Release (%s)\n' "$complete_name" > current.md
printf '\n### Packages released\n\n' >> current.md

# extract changelogs that changed, and make a markdown list. We insert everything in a temporal changelog markdown
git diff HEAD --name-only | grep "CHANGELOG.md" | grep "packages" | sort | sed  's#packages/\(.*\)/CHANGELOG.md#- [\1 changelog](packages/\1/CHANGELOG.md)#' >> current.md

# new line
printf '\n' >> current.md

# insert changes in 2nd line of CHANGELOG.md
sed '2 r current.md' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md

# remove the temporal changelog
rm current.md