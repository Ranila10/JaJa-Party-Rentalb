#!/bin/bash

# TITLE="Taco Party" LOCATION="Mexican Restaurant" DATE="2022/05/05" TIME="5:00 PM" DESCRIPTION="Cinco De Mayo Celebration" OWNER="62701f307cbe66f4855b5e1a" TOKEN="c54140e3bb8299090c203d08517dc4cd" ID="62702af2d72774fc5963d82a" sh curl-scripts/events/update.sh

API="http://localhost:4741"
URL_PATH="/rentals"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "rental": {
      "title": "'"${TITLE}"'",
      "price": "'"${PRICE}"'",
      "quantity": "'"${QUANTITY}"'",
      "color": "'"${COLOR}"'",
      "pickup": "'"${PICKUP}"'",
      "delivery": "'"${DELIVERY}"'"
    }
  }'

echo