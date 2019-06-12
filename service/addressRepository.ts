import * as AWS from 'aws-sdk';
import { LinkAddress, Link } from '../models/dynamo';
import { AddressUsecase } from '../domain/address';

export class AddressRepository implements AddressUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async getAddressList(ownerAddress: string) {
        const query = new LinkAddress(undefined, ownerAddress).keyQuery;
        const addressList = [];
        let response: AWS.Response<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>;
        let nextPage: AWS.Request<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError> | void = this.dbClient.get(query);
        while ((!!nextPage || (response.hasNextPage && (nextPage = response.nextPage())))) {
            if (!nextPage) { break; }
            const tmpResponse = await nextPage.promise();
            response = tmpResponse.$response;
            response.data.foreach(res => addressList.push(res.address));
        };
        return addressList;
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