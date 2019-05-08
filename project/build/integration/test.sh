#!/bin/bash

export GOPATH="/go_workspace"
mkdir -p ${GOPATH}
chmod -R 777 ${GOPATH}

#install gopherjs
go get -u github.com/gopherjs/gopherjs
chmod -R 777 ${GOPATH}

git clone https://github.com/sagiegurari/node-go-require.git ./node-go-require
cd ./node-go-require

npm --loglevel error --development install

npm run grunt jstest
