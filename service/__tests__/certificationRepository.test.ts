import {CertificationRepository} from '../certificationRepository';
import * as EthCrypto from 'eth-crypto';

describe('certificationCache', () => {
    const bob = EthCrypto.createIdentity();
    const repo = new CertificationRepository();
    let token:string = undefined;
    it('should generate encrypted text', async () => {
        token = await repo.createCertText(bob.publicKey);
        expect(token).toBeDefined();
    });

    it('should validate text', async () => {
        const encrypted = EthCrypto.cipher.parse(token);
        const decryptedText = await EthCrypto.decryptWithPrivateKey(bob.privateKey, encrypted);
        const address = EthCrypto.publicKey.toAddress(bob.publicKey);
        const res = repo.checkValidation(address, decryptedText);
        expect(res).toBe(true);
        const res2 = repo.checkValidation(address, decryptedText);
        expect(res2).toBe(false);
    });
}); 