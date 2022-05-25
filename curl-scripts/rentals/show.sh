#!/bin/bash

# ID="62702af2d72774fc5963d82a" sh curl-scripts/events/show.sh

API="http://localhost:4741"
URL_PATH="/rentals"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
