import { getLinkAddress, createAddress, linkAddress } from '../address';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import sinon from 'sinon';
import AWS from 'aws-sdk';

describe('address handler', () => {
    const sandbox = sinon.createSandbox();
    
    beforeAll(() => {
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns({promise: () => ({})});
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'delete').returns({promise: () => ({})});
    });

    it('should return status code 404 with message', async () => {
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        event.queryStringParameters = { linkaddress: 'test', symbol: 'ETH' };
        const res = await getLinkAddress(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(404);
        expect(body.message).toBeDefined();
        expect(body.message).toBe('not linked address : test, symbol : ETH');
    });

    it('should return status code 400 with message', async () => {
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        event.body = JSON.stringify({ linkaddress: 'test', ownerAddress: 'addr2', token: 'token-11' });
        const res = await createAddress(event, context, () => {});
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(400);
        expect(body.message).toBeDefined();
        expect(body.message).toBe('invalid certification token');
    }, 100000);
});