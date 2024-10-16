#!/usr/bin/env sh
scp ./pyproject.toml \
./poetry.lock \
./startup_services.sh \
./src/ \
root@165.227.96.135:/root/mta-naughty-nice/
