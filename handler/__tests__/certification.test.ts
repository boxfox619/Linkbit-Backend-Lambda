import { getCertText } from '../certification';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import crypto from 'crypto';
import * as eutil from 'ethereumjs-util';
import sinon from 'sinon';
import AWS from 'aws-sdk';

describe('certification handler', () => {
    const sandbox = sinon.createSandbox();
    const privateKey = crypto.randomBytes(32);
    const publicKey = eutil.privateToPublic(privateKey).toString('hex');

    beforeAll(() => {
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({promise: () => ({})});
    });

    it('should return status code 200 with token', async () => {
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        event.queryStringParameters = { publicKey };
        const res = await getCertText(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(body.token).toBeDefined();
    });
});