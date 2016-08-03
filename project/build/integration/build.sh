#!/bin/bash

set -ev

cd "$(dirname "$0")"

docker build -t test .

docker run --name test -t --cidfile ./test.cid test
