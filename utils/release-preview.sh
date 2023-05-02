#!/usr/bin/env bash

# stop if any command fails
set -e

pnpm changeset status

# Prompt the user for confirmation
read -e -p $'\nThis is a release changelog files preview!!!\n\Updated files are not commited, it is recommanded to discard all changes after.\n\nPress enter to continue.' confirm

# current directory
cwd=$(dirname "$0")

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
today=$(date +'%Y-%m-%d-%H-%M')
codename=$(pnpm codename | sed 's/ /-/g')
complete_name="${today}_${codename}"

# git pull before continue
git pull
# generate version (version bumps and changelogs)
pnpm changeset version
# merge changelogs links into root CHANGELOG.md
"$cwd/extract-changelogs.sh" "$complete_name"

# update lock file
pnpm i