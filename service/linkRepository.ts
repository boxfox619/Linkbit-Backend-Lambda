import * as AWS from 'aws-sdk';
import { Link } from '../models';
import { LinkUsecase } from '../domain/link';
import { AddressUsecase } from '../domain/address';
import AddressMap from '../models/addressMap';

export class LinkRepository implements LinkUsecase {

    constructor(
        private dbClient: AWS.DynamoDB.DocumentClient,
        private addressRepo: AddressUsecase
    ) { }

    async getAddressMap(ownerAddress: string) {
        const addressList = await this.addressRepo.getAddressList(ownerAddress);
        const promiseList = addressList.map(async (address) => {
            const query = new Link(address).keyQuery;
            const addressMap = new AddressMap(ownerAddress, address);
            let response: AWS.Response<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>;
            let nextPage: AWS.Request<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError> | void = this.dbClient.get(query);
            while ((!!nextPage || (response.hasNextPage && (nextPage = response.nextPage())))) {
                if (!nextPage) { break; }
                const tmpResponse = await nextPage.promise();
                response = tmpResponse.$response;
                response.data.foreach((link: Link) => addressMap.accountAddressMap[link.symbol] = link.account);
            };
            return addressMap;
        });
        return await Promise.all(promiseList);
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