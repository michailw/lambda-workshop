#!/bin/sh

LAMBDA_FUNCTION="$1"

tsc
npm prune --production
cp -r node_modules dist/
pushd dist
zip -r lambdaFunction.zip *
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION} --zip-file fileb://lambdaFunction.zip

rm -rf node_modules
rm -f lambdaFunction.zip
popd
npm ci
