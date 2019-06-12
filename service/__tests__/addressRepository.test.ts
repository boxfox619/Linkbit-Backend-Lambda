import { AddressRepository } from '../addressRepository';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import { createDBClient, LinkAddress, Link } from '../../models';

describe('addressRepository', () => {
    const linkAddress1 = 'address';
    const linkAddress2 = 'linkAddress';
    const owner = 'owner';
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
            if (query.Key.address === linkAddress2) {
                return { Item: new LinkAddress(linkAddress2, owner) };
            } else {
                return {};
            }
        }
    });
    const addressRepo = new AddressRepository(createDBClient());

    it('should create address well', async () => {
        await addressRepo.createAddress(linkAddress1, owner);
        const lastCall = putStub.getCall(putStub.getCalls().length - 1);
        const putQuery = lastCall.args[0];
        expect(putQuery).toBeDefined();
        expect(putQuery.Item.address).toBe(linkAddress1);
        expect(putQuery.Item.owner).toBe(owner);
    });

    it('should delete address well', async () => {
        await addressRepo.deleteAddress(linkAddress2);
        const lastCall = deleteStub.getCall(deleteStub.getCalls().length - 1);
        const deleteQuery = lastCall.args[0];
        expect(deleteQuery).toBeDefined();
        expect(deleteQuery.Key.address).toBe(linkAddress2);
    });

    it('should get owner well', async () => {
        const ownerAddress = await addressRepo.getOwner(linkAddress2);
        expect(ownerAddress).toBeDefined();
        expect(ownerAddress).toBe(owner);
    });

    it('should check address exist well', async () => {
        const exist1 = await addressRepo.checkExistLink(linkAddress2);
        expect(exist1).toBeTruthy();
        const exist2 = await addressRepo.checkExistLink(linkAddress1);
        expect(exist2).toBeFalsy();
    });

}); 