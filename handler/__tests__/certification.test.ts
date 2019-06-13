import sinon from 'sinon';
import CertificationHandlers from '../certification';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { CertificationRepository } from '../../service';

describe('certification handler', () => {
    const certRepo = sinon.createStubInstance(CertificationRepository);
    const certHandler = CertificationHandlers(certRepo);

    it('should return status code 200 with token', async () => {
        const testCert = 'test-cert';
        certRepo.createCertText.returns(testCert);
        const event: APIGatewayProxyEvent = apiGatewayEventMock({}, { publicKey: 'publicKey' });
        const context: Context = contextMock();
        const res = await certHandler.getCertText(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(body.token).toBe(testCert);
    });

    it('should return status code 400 with error', async () => {
        const event: APIGatewayProxyEvent = apiGatewayEventMock();
        const context: Context = contextMock();
        const res = await certHandler.getCertText(event, context, () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(400);
        expect(body.message).toBe('missing query parametes publicKey');
    });
});