#!/usr/bin/env sh
scp ./pyproject.toml \
./poetry.lock \
./startup_services.sh \
./src/ \
root@{{IP_ADDR}}:/root/mta-naughty-nice/
