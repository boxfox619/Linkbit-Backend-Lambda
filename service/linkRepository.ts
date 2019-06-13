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
        const addressList = await this.addressRepo.getAddressList(ownerAddress);
        const query = {
            RequestItems: {
                [Link.TableName]: {
                    Keys: addressList.map(address => new Link(address).keyQuery.Key)
                }
            }
        };
        const res = await this.dbClient.batchGet(query).promise();
        const linkList = res.Responses[Link.TableName] as Link[];
        linkList.reduce((map, link) => {
            const linkMap = map[link.address] || {};
            linkMap[link.symbol] = link.account;
            map[link.address] = linkMap;
            return linkMap;
        }, {});
        return linkList;
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