import * as ethCrypto from 'eth-crypto';
import randomToken from '../util/randomToken';
const cache: {[publicKey: string]: string;} = {}

export const createCertText = async (publicKey: string) => {
    const randomText = randomToken(10);
    const address = ethCrypto.publicKey.toAddress(publicKey);
    const encrypted = await ethCrypto.encryptWithPublicKey(publicKey, randomText)
    const encryptedText = ethCrypto.cipher.stringify(encrypted)
    cache[address] = randomText;
    return encryptedText;
}

export const checkValidation = (address: string, decryptedText: string) => {
    const originalText = cache[address];
    const valid = !!originalText && originalText === decryptedText;
    cache[address] = undefined;
    return valid;
}

export default cache;