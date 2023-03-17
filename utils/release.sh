#!/bin/bash

# stop if any command fails
set -e

# verify minimal git version
gitVersion=$(git --version | sed 's#git version \(.*\)#\1#')
gitMajorVersion=$(echo "$gitVersion" | cut -d "." -f 1)
gitMinorVersion=$(echo "$gitVersion" | cut -d "." -f 2)

if ! [[ "$gitMajorVersion" -ge "2" && "$gitMinorVersion" -ge "4" ]] ; then
  # we need git 2.4>= to continue
  RED='\033[0;31m'
  printf "${RED}you need a git version >2.4 to continue\n"
  exit 1
fi

# update packages if needed
pnpm i

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
