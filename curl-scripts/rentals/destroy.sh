#!/bin/bash

# ID="627020987cbe66f4855b5e1b" TOKEN="c54140e3bb8299090c203d08517dc4cd" sh curl-scripts/events/destroy.sh

API="http://localhost:4741"
URL_PATH="/rentals"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo