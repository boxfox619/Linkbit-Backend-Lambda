import { CertificationRepository } from '../certificationRepository';
import sinon from 'sinon';
import * as EthCrypto from 'eth-crypto';
import AWS from 'aws-sdk';

describe('certificationCache', () => {
    const sandbox = sinon.createSandbox();
    let putQuery;
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const repo = new CertificationRepository(dbClient);
    const bob = EthCrypto.createIdentity();
    let token: string = undefined;

    it('should generate encrypted text', async () => {
        const updateQuery = () => putQuery = putStub.getCall(0).args[0];
        const putStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({ promise: updateQuery});
        token = await repo.createCertText(bob.publicKey);
        expect(token).toBeDefined();
    });

    it('should validate text', async () => {
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns({ promise: () => putQuery });
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'delete').returns({ promise: () => { } });
        const encrypted = EthCrypto.cipher.parse(token);
        const decryptedText = await EthCrypto.decryptWithPrivateKey(bob.privateKey, encrypted);
        const address = EthCrypto.publicKey.toAddress(bob.publicKey);
        const res = await repo.checkValidation(address, decryptedText);
        expect(res).toBe(true);
        const res2 = await repo.checkValidation(address, 'asdasd');
        expect(res2).toBe(false);
    });
}); 