import { missingParameters } from "../models/lambda";
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

export interface Parameter {
    queryParams: { [key: string]: string },
    pathParams: { [key: string]: string },
    body: { [key: string]: any }
}

export interface RequiredParams {
    queryParams?: string[],
    pathParams?: string[],
    body?: string[]
}

export const middleware = <T extends Parameter>(handler: (param: T) => Promise<APIGatewayProxyResult>, required: RequiredParams = {}): APIGatewayProxyHandler => {
    return async (event) => {
        const queryParams = event.queryStringParameters || {};
        const pathParams = event.pathParameters || {};
        const body = JSON.parse(event.body || '{}');
        const param = { queryParams, pathParams, body } as Parameter;
        const missingQueryParams = validateParams(queryParams, required.queryParams);
        const missingPathParams = validateParams(pathParams, required.pathParams);
        const missingBodyParams = validateParams(body, required.body);
        if (missingQueryParams.length + missingPathParams.length + missingBodyParams.length > 0) {
            return missingParameters(missingQueryParams, missingPathParams, missingBodyParams);
        }
        const response = await handler(param as T);
        response.headers = {};
        response.headers['Access-Control-Allow-Origin'] = event.headers.origin;
        response.headers['Access-Control-Allow-Credentials'] = 'true';
        response.headers['Access-Control-Allow-Methods'] = "POST,GET,OPTIONS,DELETE,PUT";
        response.headers['Access-Control-Allow-Headers'] = "x-requested-with,content-type";
        return response;
    }
}

const validateParams = (params: { [key: string]: any }, required: string[] = []) => {
    const paramKeys = Object.keys(params);
    return required.filter(key => !paramKeys.includes(key));
}