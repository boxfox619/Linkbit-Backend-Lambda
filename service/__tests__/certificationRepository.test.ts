import { CertificationRepository } from '../certificationRepository';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import * as crypto from 'crypto';
import * as eutil from 'ethereumjs-util';
import ECIES from 'eth-ecies';

describe('certificationCache', () => {
    const sandbox = sinon.createSandbox();
    let putQuery;
    const dbClient = new AWS.DynamoDB.DocumentClient();
    const repo = new CertificationRepository(dbClient);
    const privateKey = crypto.randomBytes(32);
    const publicKey = eutil.privateToPublic(privateKey);
    let token: string = undefined;

    it('should generate encrypted text', async () => {
        const updateQuery = () => putQuery = putStub.getCall(0).args[0];
        const putStub = sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns({ promise: updateQuery });
        token = await repo.createCertText(publicKey.toString('hex'));
        expect(token).toBeDefined();
    });

    it('should validate text', async () => {
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns({ promise: () => putQuery });
        sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'delete').returns({ promise: () => { } });
        const decryptedText = ECIES.decrypt(privateKey, Buffer.from(token, 'hex')).toString();
        const address = eutil.pubToAddress(publicKey).toString("hex");
        const res = await repo.checkValidation(address, decryptedText);
        expect(res).toBe(true);
        const res2 = await repo.checkValidation(address, 'asdasd');
        expect(res2).toBe(false);
    });
}); 