import { middleware } from '../middleware';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { apiGatewayEventMock, contextMock } from '../mock';

describe('middleware', () => {
    it('middleware return missing paramets', async () => {
        const handler = jest.fn();
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        const res = await middleware(handler, { queryParams: ['test'] })(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        expect(response.statusCode).toBe(400);
        expect(response.body).toContain('missing query parametes test');
    })

    it('middleware call handler', async () => {
        const handler = jest.fn();
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        event.queryStringParameters.test = 'testa';
        await middleware(handler, { queryParams: ['test'] })(event, context, () => { });
        expect(handler.mock.calls.length).toBe(1);
    })
})