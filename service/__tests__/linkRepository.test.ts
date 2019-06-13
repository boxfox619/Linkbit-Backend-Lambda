import { AddressRepository } from '../addressRepository';
import { LinkRepository } from '../linkRepository';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import { createDBClient, Link, LinkAddress } from '../../models/dynamo';
import { AddressMap } from '../../models/entity';

describe('linkRepository', () => {
    const linkAddress = 'linkAddress';
    const owner = 'owner';
    const testAddresss = 'testAddress';
    const symbol = 'eth';
    const sandbox = sinon.createSandbox();
    const getStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get');
    const queryStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'query');
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
    queryStub.returns({
        promise: () => {
            return {
                Items: [
                    new Link('link-address', 'eth', owner),
                    new Link('link-address', 'eos', owner),
                    new Link('link-address2', 'eth', owner)
                ]
            }
        }
    });
    const addressRepo = sinon.createStubInstance(AddressRepository);
    addressRepo.checkExistLink.returns(true);
    addressRepo.getAddressList.returns([linkAddress]);
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

    it('should get link address map well', async () => {
        const addressMaps = await linkRepo.getAddressMap(owner);
        expect(addressMaps).toBeDefined();
        expect(addressMaps.length).toBe(1);
        expect(addressMaps[0]).toEqual(new AddressMap(owner, linkAddress, { EOS: owner, ETH: owner }));
        const lastCall = queryStub.getCall(queryStub.getCalls().length - 1);
        const query = lastCall.args[0];
        const expectedQuery = {
            TableName: Link.TableName,
            KeyConditionExpression: 'address = :address',
            ExpressionAttributeValues: { ':address': linkAddress },
        };
        expect(query).toEqual(expectedQuery);
    });
}); 