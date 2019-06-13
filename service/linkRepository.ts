import * as AWS from 'aws-sdk';
import { Link } from '../models/dynamo';
import { AddressUsecase, LinkUsecase } from '../models/domain';
import { AddressMap } from '../models/entity';

export class LinkRepository implements LinkUsecase {

    constructor(
        private dbClient: AWS.DynamoDB.DocumentClient,
        private addressRepo: AddressUsecase
    ) { }

    async getAddressMap(ownerAddress: string) {
        const addressMapList = [];
        const addressList = await this.addressRepo.getAddressList(ownerAddress);
        for(const address of addressList) {
            const query = {
                TableName: Link.TableName,
                KeyConditionExpression: 'address = :address',
                ExpressionAttributeValues: { ':address': address },
            };
            const res = await this.dbClient.query(query).promise();
            const addressMap = new AddressMap(ownerAddress, address);
            (res.Items as Link[]).forEach(link => {
                addressMap.accountAddressMap[link.symbol] = link.account;
            });
            addressMapList.push(addressMap);
        }
        return addressMapList;
    };

    async linkAddress(linkAddress: string, accountAddress: string, symbol: string) {
        const isExist = await this.addressRepo.checkExistLink(linkAddress);
        if (!isExist) throw new Error(`not found linkaddress ${linkAddress}`);
        await this.unlinkAddress(linkAddress, symbol);
        await this.dbClient.put(new Link(linkAddress, symbol, accountAddress).putQuery).promise();
    }

    async getLinkAddress(linkaddress: string, symbol: string) {
        const address = await this.dbClient.get(new Link(linkaddress, symbol).keyQuery).promise();
        if (!address.Item) throw new Error(`not linked address : ${linkaddress}, symbol : ${symbol}`);
        return (address.Item as Link).account;
    }

    async unlinkAddress(linkAddress: string, symbol: string) {
        await this.dbClient.delete(new Link(linkAddress, symbol).keyQuery).promise();
    }

}