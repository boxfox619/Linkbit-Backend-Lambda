import { AddressRepository } from '../addressRepository';
import { LinkRepository } from '../linkRepository';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import { createDBClient, LinkAddress, Link } from '../../models';

describe('addressRepository', () => {
    const linkAddress = 'linkAddress';
    const owner = 'owner';
    const testAddresss = 'testAddress';
    const symbol = 'eth';
    const sandbox = sinon.createSandbox();
    const getStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get');
    const deleteStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'delete');
    const putStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put');
    putStub.returns({ promise: () => ({}) });
    deleteStub.returns({ promise: () => ({}) });
    getStub.returns({
        promise: () => {
            const lastCall = getStub.getCall(getStub.getCalls().length - 1);
            const query = lastCall.args[0];
            if (query.Key.address === linkAddress) {
                return { Item: new Link(linkAddress, 'eth', owner) };
            } else {
                return {};
            }
        }
    });
    const addressRepo = new AddressRepository(createDBClient());
    const linkRepo = new LinkRepository(createDBClient(), addressRepo);

    it('should unlink address well', async () => {
        await linkRepo.unlinkAddress(linkAddress, symbol);
        const lastCall = deleteStub.getCall(deleteStub.getCalls().length - 1);
        const deleteQuery = lastCall.args[0];
        expect(deleteQuery).toBeDefined();
        expect(deleteQuery.TableName).toBe(Link.TableName);
        expect(deleteQuery.Key.address).toBe(linkAddress);
        expect(deleteQuery.Key.symbol).toBe(symbol.toUpperCase());
    });

    it('should link address well', async () => {
        await linkRepo.linkAddress(linkAddress, testAddresss, symbol);
        const lastCall = putStub.getCall(putStub.getCalls().length - 1);
        const putQuery = lastCall.args[0];
        expect(putQuery).toBeDefined();
        expect(putQuery.TableName).toBe(Link.TableName);
        expect(putQuery.Item.address).toBe(linkAddress);
        expect(putQuery.Item.account).toBe(testAddresss);
        expect(putQuery.Item.symbol).toBe(symbol.toUpperCase());
    });

    it('should get link address well', async () => {
        const accountAddress = await linkRepo.getLinkAddress(linkAddress, symbol);
        expect(accountAddress).toBeDefined();
        expect(accountAddress).toBe(owner);
        const lastCall = getStub.getCall(getStub.getCalls().length - 1);
        const getQuery = lastCall.args[0];
        expect(getQuery).toBeDefined();
        expect(getQuery.TableName).toBe(Link.TableName);
        expect(getQuery.Key.address).toBe(linkAddress);
        expect(getQuery.Key.symbol).toBe(symbol.toUpperCase());
    });

}); 