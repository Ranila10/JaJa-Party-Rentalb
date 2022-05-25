#!/bin/bash

# TOKEN="c54140e3bb8299090c203d08517dc4cd" sh curl-scripts/events/index.sh

API="http://localhost:4741"
URL_PATH="/rentals"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
# if we want unauth users to be able to access events index, we dont need TOKEN authorization
#   --header "Authorization: Bearer ${TOKEN}"

echo
