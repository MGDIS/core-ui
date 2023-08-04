#!/usr/bin/env bash

branch_name="chore%2Fchromatic-version-update"
mr_title="Chore%3A%20Init%20next%20release"
mr_description="TODO%3A%0A%0A-%20%5B%20%5D%20Set%20Chromatic%20version%20%28https%3A%2F%2Fwww.chromatic.com%2Flibrary%3FappId%3D626149b307606d003ada26b4%29%0A-%20%5B%20%5D%20Resolve%20Sonar%20code%20smell%20%28https%3A%2F%2Fsonarqube.mgcloud.fr%2Fdashboard%3Fid%3Dcore-ui-master%29%0A%0A%40core%2Fcore-ui%20"

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
created_merge_request=$(perform_gitlab_request "merge_requests?source_branch=$branch_name&target_branch=master&title=$mr_title&description=$mr_description&remove_source_branch=true")

merge_request_url=$(echo $created_merge_request | tr '\r\n' ' ' | jq '.web_url' | tr -d '"')

echo "Created MR link: ${merge_request_url}"