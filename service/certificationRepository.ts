import * as ethCrypto from 'eth-crypto';
import randomToken from '../util/randomToken';
import { CertificationUsecase } from '../domain/certification';
const cache: {[publicKey: string]: string;} = {}

export class CertificationRepository implements CertificationUsecase {
    async createCertText(publicKey: string) {
        const randomText = randomToken(10);
        const address = ethCrypto.publicKey.toAddress(publicKey);
        const encrypted = await ethCrypto.encryptWithPublicKey(publicKey, randomText)
        const encryptedText = ethCrypto.cipher.stringify(encrypted)
        cache[address] = randomText;
        return encryptedText;
    }

    async checkValidation(address: string, decryptedText: string) {
        const originalText = cache[address];
        const valid = !!originalText && originalText === decryptedText;
        cache[address] = undefined;
        return valid;
    }
}