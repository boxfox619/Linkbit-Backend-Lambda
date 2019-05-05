import * as ethCrypto from 'eth-crypto';
import randomToken from '../util/randomToken';
const cache: object = {}

export const createCertText = (publicKey: string) => {
    const randomText = randomToken(10);
    const encryptedText = ethCrypto.encryptWithPublicKey(publicKey, randomText)
    cache[publicKey] = randomText;
    return encryptedText;
}

export default cache;