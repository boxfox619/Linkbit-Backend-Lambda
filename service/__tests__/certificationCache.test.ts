import * as certificationCache from '../certificationCache';
import * as EthCrypto from 'eth-crypto';

describe('certificationCache', () => {
    const bob = EthCrypto.createIdentity();
    let token:string = undefined;
    it('should generate encrypted text', async () => {
        token = await certificationCache.createCertText(bob.publicKey);
        expect(token).toBeDefined();
    });

    it('should validate text', async () => {
        const encrypted = EthCrypto.cipher.parse(token);
        const decryptedText = await EthCrypto.decryptWithPrivateKey(bob.privateKey, encrypted);
        const address = EthCrypto.publicKey.toAddress(bob.publicKey);
        const res = certificationCache.checkValidation(address, decryptedText);
        expect(res).toBe(true);
        const res2 = certificationCache.checkValidation(address, decryptedText);
        expect(res2).toBe(false);
    });
}); 