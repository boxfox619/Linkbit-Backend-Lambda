import * as ethCrypto from 'eth-crypto';
import randomToken from '../util/randomToken';
const cache: {[publicKey: string]: string;} = {}

export const createCertText = async (publicKey: string) => {
    const randomText = randomToken(10);
    const encrypted = await ethCrypto.encryptWithPublicKey(publicKey, randomText)
    const encryptedText = ethCrypto.cipher.stringify(encrypted)
    cache[publicKey] = randomText;
    return encryptedText;
}

export const checkValidation = (publicKey: string, decryptedText: string) => {
    const originalText = cache[publicKey];
    const valid = !!originalText && originalText === decryptedText;
    cache[publicKey] = undefined;
    return valid;
}

export default cache;