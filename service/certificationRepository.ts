import { CertificationUsecase } from '../domain/certification';
import { Token } from '../models/token';
import ECIES from 'eth-ecies';
import * as eutil from 'ethereumjs-util';
import * as crypto from 'crypto';

export class CertificationRepository implements CertificationUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async createCertText(publicKeyHex: string) {
        const publicKey = Buffer.from(publicKeyHex, 'hex');
        const randomText = crypto.randomBytes(30).toString('hex');
        const address = eutil.pubToAddress(publicKey).toString("hex");
        const encryptedText = ECIES.encrypt(publicKey, randomText).toString('hex');
        await this.dbClient.put(new Token(address, randomText).putQuery).promise();
        return encryptedText;
    }

    async checkValidation(address: string, decryptedText: string) {
        const res = await this.dbClient.get(new Token(address).keyQuery).promise();
        await this.dbClient.delete(new Token(address).keyQuery).promise();
        return !!res.Item && res.Item.token === decryptedText;
    }
}