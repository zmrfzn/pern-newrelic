#!/bin/sh

URL=http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080/api/tutorials
URL2=http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080/api/tutorials/categories
URL3=http://$HOSTNAME.$_SANDBOX_ID.instruqt.io:8080/api/tutorials/published

npx load-generator --workers 4 --pause 5000 "$URL" "$URL2" "$URL3" -p
