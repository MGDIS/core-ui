#!/usr/bin/env bash

branch_name="chore%2Fchromatic-version-update"
mr_title="Chore%3A%20Chromatic%20Version%20Update"
mr_description="%40core%2Fcore-ui%20https%3A%2F%2Fwww.chromatic.com%2Flibrary%3FappId%3D626149b307606d003ada26b4"

# Request
perform_gitlab_request() {
  response=$(curl -X POST \
    --header "Authorization: Bearer $PERSONAL_ACCESS_TOKEN" \
    --header "Content-Type: application/json" \
    "https://gitlab.mgdis.fr/api/v4/projects/$CI_PROJECT_ID/$1" 2>/dev/null)
  echo $response
}


# Create branch
created_branch=$(perform_gitlab_request "repository/branches?branch=$branch_name&ref=master")

# Create MR
created_merge_request=$(perform_gitlab_request "merge_requests?source_branch=$branch_name&target_branch=master&title=$mr_title&description=$mr_description")

merge_request_url=$(echo $created_merge_request | tr '\r\n' ' ' | jq '.web_url' | tr -d '"')

echo "Created MR link: ${merge_request_url}"