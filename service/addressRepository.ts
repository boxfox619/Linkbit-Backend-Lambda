import { Database } from '../models';
import { AddressUsecase } from '../domain/address';

export class AddressRepository implements AddressUsecase {

    constructor(private db: Database) { }

    async createAddress(linkAddress: string, ownerAddress: string) {
        const isExist = await this.checkExistLink(linkAddress);
        if (isExist) throw new Error(`already exist link ${linkAddress}`);
        await this.db.address.create({
            linkAddress,
            owner_address: ownerAddress
        });
    };

    async checkExistLink(linkAddress: string) {
        return !!this.db.link.findByPk(linkAddress);
    }

    async getOwner(linkAddress: string) {
        const linkaddress = this.db.address.findByPk(linkAddress);
        if (!linkaddress) throw new Error(`not found linkaddress ${linkAddress}`);
        return linkaddress.owner_Address;
    };

    async linkAddress(linkAddress: string, accountAddress: string, symbol: string) {
        const isExist = await this.checkExistLink(linkAddress);
        if (!isExist) throw new Error(`not found linkaddress ${linkAddress}`);
        await this.unlinkAddress(linkAddress, symbol);
        await this.db.link.create({ linkAddress, account_address: accountAddress, symbol });
    }

    async getAddress(linkaddress: string, symbol: string) {
        const address = await this.db.link.findOne({ where: { linkaddress, symbol } });
        if (!address) throw new Error(`not linked address : ${linkaddress}, symbol : ${symbol}`);
        return address.address;
    }

    async unlinkAddress(linkAddress: string, symbol: string) {
        await this.db.link.destroy({ where: { linkAddress, symbol } });
    }

}