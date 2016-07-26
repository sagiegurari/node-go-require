#!/bin/bash

set -ev

docker build -t test .

docker run --name test -t --cidfile ./test.cid test
