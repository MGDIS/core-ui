#!/bin/bash

# stop if any command fails
set -e

# generate an unique codename
today=$(date +%F)
codename=$(pnpm codename | sed 's/ /-/g')
complete_name="${today}_${codename}"
# git pull before continue
git pull
# generate version (version bumps and changelogs)
pnpm changeset version
# update lock file
pnpm i
# add all files to git stash
git add --all
# commit all changes
git commit -m "chore(release): $complete_name"
# tag release name
git tag -a "$complete_name" -m ""
# push commit and tags at the same time
git push --atomic