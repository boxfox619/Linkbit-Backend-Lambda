import * as AWS from 'aws-sdk';
import { LinkAddress, Link } from '../models/dynamo';
import { AddressUsecase } from '../models/domain/address';

export class AddressRepository implements AddressUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async getAddressList(ownerAddress: string) {
        const query = new LinkAddress(undefined, ownerAddress).batchQuery;
        const res = await this.dbClient.batchGet(query).promise();
        const addressList = res.Responses[LinkAddress.TableName] as LinkAddress[];
        return addressList.map(address => address.address);
    }

    async createAddress(linkaddress: string, ownerAddress: string) {
        const isExist = await this.checkExistLink(linkaddress);
        if (isExist) throw new Error(`already exist link ${linkaddress}`);
        const query = new LinkAddress(linkaddress, ownerAddress).putQuery;
        await this.dbClient.put(query).promise();
    };

    async deleteAddress(linkaddress: string) {
        const isExist = await this.checkExistLink(linkaddress);
        if (!isExist) throw new Error(`not exist link ${linkaddress}`);
        const query = new LinkAddress(linkaddress).keyQuery;
        await this.dbClient.delete(query).promise();
        const query2 = new Link(linkaddress).keyQuery;
        await this.dbClient.delete(query2).promise();
    };

    async checkExistLink(linkaddress: string) {
        const query = new LinkAddress(linkaddress).keyQuery;
        const res = await this.dbClient.get(query).promise();
        return !!res.Item;
    };

    async getOwner(linkAddress: string) {
        const linkaddress = await this.dbClient.get(new LinkAddress(linkAddress).keyQuery).promise();
        if (!linkaddress.Item) throw new Error(`not found linkaddress ${linkAddress}`);
        return (linkaddress.Item as LinkAddress).owner;
    };
}