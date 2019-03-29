"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers = {
    "GET": {
        "/": (queryStringParameters) => {
            return {
                date: new Date().toLocaleString(),
                queryStringParameters: queryStringParameters
            };
        }
    },
    "POST": {
        "/": (queryStringParameters, body) => {
            return {
                date: new Date().toLocaleString(),
                queryStringParameters: queryStringParameters,
                body: body
            };
        }
    }
};
const responseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": 0
};
exports.handler = async (event = {}, context = {}, callback = () => { }) => {
    let { path, httpMethod, queryStringParameters, body, resource } = event;
    resource = resource.replace("{proxy+}", "");
    path = path.replace(resource, "");
    if (path.charAt(0) !== "/") {
        path = "/" + path;
    }
    let response = {
        body: JSON.stringify({
            message: `Not implemented: [${httpMethod}] ${path}`
        }),
        headers: responseHeaders,
        statusCode: 405
    };
    try {
        if (handlers.hasOwnProperty(httpMethod) && handlers[httpMethod].hasOwnProperty(path)) {
            if (httpMethod !== "OPTIONS") {
                response.body = JSON.stringify(await handlers[httpMethod][path](queryStringParameters, body));
            }
            response.statusCode = 200;
        }
    }
    catch (error) {
        response.body = JSON.stringify(error);
        response.statusCode = 500;
        console.error(error);
    }
    callback(null, response);
};
