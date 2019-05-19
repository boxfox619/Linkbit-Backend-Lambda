import { getLinkAddress, createAddress, linkAddress } from '../address';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import { Token } from '../../models/token';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

describe('address handler', () => {
    const sandbox = sinon.createSandbox();
    const address = 'address';
    const token = new Token(address, 'token');
    let putStub;

    beforeAll(() => {
        const getStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get');
        getStub.withArgs(new Token(address).keyQuery).returns({ promise: () => ({ Item: token }) });
        getStub.returns({ promise: () => ({}) });
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'delete').returns({ promise: () => ({}) });
        putStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put');
        putStub.returns({ promise: () => ({}) });
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
        const res = await createAddress(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(400);
        expect(body.message).toBeDefined();
        expect(body.message).toBe('invalid certification token');
    });

    it('should return status code 200 and database update', async () => {
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        event.body = JSON.stringify({ linkaddress: 'test', ownerAddress: token.address, token: token.token });
        const res = await createAddress(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        expect(response.statusCode).toBe(200);
        expect(putStub.getCall(0)).toBeDefined();
        expect(putStub.getCall(0).args[0]).toBeDefined();
        const putQuery = putStub.getCall(0).args[0] as PutItemInput;
        expect(putQuery.TableName).toBe('linkaddress');
        expect(putQuery.Item).toBeDefined();
        expect(putQuery.Item.address).toBe('test');
        expect(putQuery.Item.owner).toBe(token.address);
    });
});