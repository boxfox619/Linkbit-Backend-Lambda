import AddressHanders from '../address';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Token } from '../../models/token';
import sinon from 'sinon';
import { CertificationRepository } from '../../service/certificationRepository';
import AWS from 'aws-sdk';
import { AddressRepository } from '../../service/addressRepository';


describe('create address handler', () => {
    const address = 'address';
    const token = new Token(address, 'token');
    const sandbox = sinon.createSandbox();
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const addressRepo = sinon.createStubInstance(AddressRepository);
    const certRepo = sinon.createStubInstance(CertificationRepository);
    const addressHanders = AddressHanders(addressRepo, certRepo);

    it('should return status code 400 with message', async () => {
        certRepo.checkValidation.returns(false);
        const event: APIGatewayProxyEvent = apiGatewayEventMock({ linkaddress: 'test', ownerAddress: 'addr2', token: 'token-11' });
        const res = await addressHanders.createAddress(event, contextMock(), () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        const body = JSON.parse(response.body);
        expect(response.statusCode).toBe(400);
        expect(body.message).toBeDefined();
        expect(body.message).toBe('invalid certification token');
    });

    it('should return status code 200 and database update', async () => {
        certRepo.checkValidation.returns(true);
        const linkaddress = 'test-link-address';
        const event: APIGatewayProxyEvent = apiGatewayEventMock({ linkaddress, ownerAddress: token.address, token: token.token });
        const res = await addressHanders.createAddress(event, contextMock(), () => { });
        expect(res).toBeDefined();
        const response = res as APIGatewayProxyResult;
        expect(response.statusCode).toBe(200);
        expect(addressRepo.createAddress.getCalls().length).toBe(1);
        const createAddressCall = addressRepo.createAddress.getCall(0);
        console.log('12312312-3123-123123-132');
        expect(createAddressCall.args[0]).toBe(linkaddress);
        expect(createAddressCall.args[1]).toBe(token.address);
    });
});