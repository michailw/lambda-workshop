#!/usr/bin/env bash

mkdir -p dist/origin-response
mkdir -p dist/viewer-request

cp -r node_modules dist/origin-response/

cp lambda/origin-response.js dist/origin-response/index.js
cp lambda/viewer-request.js dist/viewer-request/index.js

pushd dist/origin-response
zip -r origin-response-function.zip node_modules index.js
popd

pushd dist/viewer-request
zip -r viewer-request-function.zip node_modules index.js
popd

mv dist/origin-response/origin-response-function.zip dist/
mv dist/viewer-request/viewer-request-function.zip dist/

rm -rf dist/origin-response
rm -rf dist/viewer-request
