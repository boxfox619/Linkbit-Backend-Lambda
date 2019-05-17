import * as ethCrypto from 'eth-crypto';
import randomToken from '../util/randomToken';
import { CertificationUsecase } from '../domain/certification';
import { Token } from '../models/token';

export class CertificationRepository implements CertificationUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async createCertText(publicKey: string) {
        const randomText = randomToken(10);
        const address = ethCrypto.publicKey.toAddress(publicKey);
        const encrypted = await ethCrypto.encryptWithPublicKey(publicKey, randomText)
        const encryptedText = ethCrypto.cipher.stringify(encrypted)
        await this.dbClient.put(new Token(address, randomText).putQuery).promise();
        return encryptedText;
    }

    async checkValidation(address: string, decryptedText: string) {
        const res = await this.dbClient.get(new Token(address).keyQuery).promise();
        await this.dbClient.delete(new Token(address).keyQuery).promise();
        return !!res.Item && res.Item.token === decryptedText;
    }
}