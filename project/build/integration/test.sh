#!/bin/bash

export NODE_ENV=development

export GOPATH="/go_workspace"
mkdir -p ${GOPATH}
chmod -R 777 ${GOPATH}

#install gopherjs
go get -u github.com/gopherjs/gopherjs
chmod -R 777 ${GOPATH}

git clone https://github.com/sagiegurari/node-go-require.git ./node-go-require
cd ./node-go-require

yarn install

yarn run grunt jstest
