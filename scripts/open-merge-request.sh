#!/usr/bin/env bash

# stop on any error, and fail a pipeline if any piped command fails
set -eo pipefail

branch_name="chore%2Fchromatic-version-update"
mr_title="Chore%3A%20Init%20next%20release"
mr_description="TODO%3A%0A%0A-%20%5B%20%5D%20Set%20Chromatic%20version%20%28https%3A%2F%2Fwww.chromatic.com%2Fbuilds%3FappId%3D626149b307606d003ada26b4%26branch%3Dmaster%29.%0A-%20%5B%20%5D%20Resolve%20Sonar%20code%20smell%20%28https%3A%2F%2Fsonarqube.mgcloud.fr%2Fdashboard%3Fid%3Dcore-ui-master%29.%0A-%20%5B%20%5D%20Update%20dependencies%20using%20%60pnpm%20up%20-i%20-L%20-r%60%20and%20select%20non-major%20changes.%0A-%20%5B%20%5D%20Add%20changeset%0A%0A%40core%2Fcore-ui"

# POST to the GitLab API; prints the response body followed by the HTTP status on the last line
perform_gitlab_request() {
  curl --silent --show-error --write-out '\n%{http_code}' -X POST \
    --header "Authorization: Bearer $PERSONAL_ACCESS_TOKEN" \
    --header "Content-Type: application/json" \
    "https://gitlab.mgdis.fr/api/v4/projects/$CI_PROJECT_ID/$1"
}

# Create branch (tolerate "already exists" from a previous/retried run)
branch_response=$(perform_gitlab_request "repository/branches?branch=$branch_name&ref=master")
branch_status=$(echo "$branch_response" | tail -n1)
branch_body=$(echo "$branch_response" | sed '$d')

if [[ "$branch_status" != "201" && "$branch_body" != *"already exists"* ]]; then
  echo "Failed to create branch (HTTP $branch_status):" >&2
  echo "$branch_body" >&2
  exit 1
fi

# Create MR
mr_response=$(perform_gitlab_request "merge_requests?source_branch=$branch_name&target_branch=master&title=$mr_title&description=$mr_description&remove_source_branch=true")
mr_status=$(echo "$mr_response" | tail -n1)
mr_body=$(echo "$mr_response" | sed '$d')

merge_request_url=$(echo "$mr_body" | tr '\r\n' ' ' | jq -r '.web_url // empty')

if [[ -z "$merge_request_url" ]]; then
  echo "Failed to create merge request (HTTP $mr_status):" >&2
  echo "$mr_body" >&2
  echo "See GETTING-STARTED.md > Troubleshooting the release pipeline to fix PERSONAL_ACCESS_TOKEN." >&2
  exit 1
fi

echo "Created MR link: ${merge_request_url}"