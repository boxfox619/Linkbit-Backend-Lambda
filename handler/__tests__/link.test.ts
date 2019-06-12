import LinkHanders from '../link';
import { apiGatewayEventMock, contextMock } from '../../util/mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import sinon from 'sinon';
import { CertificationRepository } from '../../service/certificationRepository';
import { AddressRepository } from '../../service/addressRepository';
import { LinkRepository } from '../../service/LinkRepository';
import { Link } from '../../models';
import AddressMap from '../../models/addressMap';

describe('link handlers', () => {
    const addressRepo = sinon.createStubInstance(AddressRepository);
    const linkRepo = sinon.createStubInstance(LinkRepository);
    const certRepo = sinon.createStubInstance(CertificationRepository);
    const linkHanders = LinkHanders(addressRepo, linkRepo, certRepo);
    const linkaddress = 'test-link-address';
    const accountaddress = 'account-address';

    describe('link address handler', () => {
        it('should return status code 400 with error', async () => {
            const event: APIGatewayProxyEvent = apiGatewayEventMock();
            const res = await linkHanders.linkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            const body = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
            expect(body.message).toBe('missing body keys token,linkaddress,accountaddress,symbol');
        });

        it('should return status code 200 and database update', async () => {
            const symbol = 'eth';
            certRepo.checkValidation.returns(true);
            addressRepo.getOwner.returns(accountaddress);
            const event: APIGatewayProxyEvent = apiGatewayEventMock({ token: 'token', linkaddress, accountaddress, symbol });
            const res = await linkHanders.linkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            expect(response.statusCode).toBe(200);
            expect(linkRepo.linkAddress.getCalls().length).toBe(1);
            const call = linkRepo.linkAddress.getCall(0);
            expect(call.args[0]).toBe(linkaddress);
            expect(call.args[1]).toBe(accountaddress);
            expect(call.args[2]).toBe(symbol);
        });
    });

    describe('unlink address handler', () => {
        it('should return status code 400 with error', async () => {
            const event: APIGatewayProxyEvent = apiGatewayEventMock();
            const res = await linkHanders.unlinkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            const body = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
            expect(body.message).toBe('missing body keys token,linkaddress,symbol');
        });

        it('should return status code 200 and database update', async () => {
            certRepo.checkValidation.returns(true);
            addressRepo.getOwner.returns(accountaddress);
            const event: APIGatewayProxyEvent = apiGatewayEventMock({ token: 'token', linkaddress, symbol: 'eth' });
            const res = await linkHanders.unlinkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            expect(response.statusCode).toBe(200);
            expect(linkRepo.unlinkAddress.getCalls().length).toBe(1);
            const call = linkRepo.unlinkAddress.getCall(0);
            expect(call.args[0]).toBe(linkaddress);
        });
    });

    describe('get link address handler', () => {
        it('should return status code 400 with error', async () => {
            const event: APIGatewayProxyEvent = apiGatewayEventMock();
            const res = await linkHanders.getLinkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            const body = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
            expect(body.message).toBe('missing query parametes linkaddress,symbol');
        });

        it('should return status code 200 and database update', async () => {
            certRepo.checkValidation.returns(true);
            linkRepo.getLinkAddress.returns(new Link(linkaddress, 'eth', accountaddress));
            const event: APIGatewayProxyEvent = apiGatewayEventMock({}, { linkaddress, symbol: 'eth' });
            const res = await linkHanders.getLinkAddress(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            expect(response.statusCode).toBe(200);
            expect(linkRepo.getLinkAddress.getCalls().length).toBe(1);
            const call = linkRepo.getLinkAddress.getCall(0);
            expect(call.args[0]).toBe(linkaddress);
            expect(call.args[1]).toBe('eth');
        });
    });

    describe('get address map handler', () => {
        it('should return status code 400 with error', async () => {
            const event: APIGatewayProxyEvent = apiGatewayEventMock();
            const res = await linkHanders.getAddressMap(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            const body = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
            expect(body.message).toBe('missing query parametes ownerAddress,token');
        });

        it('should return status code 200 and database update', async () => {
            certRepo.checkValidation.returns(true);
            linkRepo.getAddressMap.returns([new AddressMap(accountaddress, linkaddress, { eth: accountaddress })]);
            const event: APIGatewayProxyEvent = apiGatewayEventMock({}, { ownerAddress: accountaddress, token: 'token' });
            const res = await linkHanders.getAddressMap(event, contextMock(), () => { });
            expect(res).toBeDefined();
            const response = res as APIGatewayProxyResult;
            expect(response.statusCode).toBe(200);
            expect(linkRepo.getAddressMap.getCalls().length).toBe(1);
            const call = linkRepo.getAddressMap.getCall(0);
            expect(call.args[0]).toBe(accountaddress);
        });
    });
});
