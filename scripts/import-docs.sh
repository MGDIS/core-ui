#!/bin/bash

packages_dir="./packages"
dest_dir="./build/docs"

# Empty docs folder
rm -rf "$dest_dir"

# Import packages markdown
for file in $(find "$packages_dir" -maxdepth 2 -name "*.md"); do
  relative_path="${file#$packages_dir}"
  destination="$dest_dir/packages$relative_path"
  mkdir -p "$(dirname "$destination")"
  cp "$file" "$destination"
done

# Import monorepo markdown
cp ./*.md "$dest_dir"

echo "{ \"label\": \"Packages\"}" > build/docs/packages/_category_.json
tar czf core-ui-artifact.tgz build/
