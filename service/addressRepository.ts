import * as AWS from 'aws-sdk';
import { LinkAddress, Link } from '../models';
import { AddressUsecase } from '../domain/address';

export class AddressRepository implements AddressUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async createAddress(linkAddress: string, ownerAddress: string) {
        const isExist = await this.checkExistLink(linkAddress);
        if (isExist) throw new Error(`already exist link ${linkAddress}`);
        const query = new LinkAddress(linkAddress, ownerAddress).putQuery;
        await this.dbClient.put(query).promise();
    };

    async checkExistLink(linkaddress: string) {
        const query = new LinkAddress(linkaddress).keyQuery;
        const res = await this.dbClient.get(query).promise();
        return !!res.Item;
    }

    async getOwner(linkAddress: string) {
        const linkaddress = await this.dbClient.get(new LinkAddress(linkAddress).keyQuery).promise();
        if (!linkaddress.Item) throw new Error(`not found linkaddress ${linkAddress}`);
        return (linkaddress.Item as LinkAddress).address;
    };

    async linkAddress(linkAddress: string, accountAddress: string, symbol: string) {
        const isExist = await this.checkExistLink(linkAddress);
        if (!isExist) throw new Error(`not found linkaddress ${linkAddress}`);
        await this.unlinkAddress(linkAddress, symbol);
        await this.dbClient.put(new Link(linkAddress, accountAddress, symbol).putQuery).promise();
    }

    async getAddress(linkaddress: string, symbol: string) {
        const address = await this.dbClient.get(new Link(linkaddress, symbol).keyQuery).promise();
        if (!address.Item) throw new Error(`not linked address : ${linkaddress}, symbol : ${symbol}`);
        return (address.Item as Link).account;
    }

    async unlinkAddress(linkAddress: string, symbol: string) {
        await this.dbClient.delete(new LinkAddress(linkAddress, symbol).keyQuery).promise();
    }

}