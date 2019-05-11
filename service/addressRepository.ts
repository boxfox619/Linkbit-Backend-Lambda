import db from '../models';
import { AddressUsecase } from '../domain/address';

export class AddressRepository implements AddressUsecase {

    createAddress = async (linkAddress: string, ownerAddress: any) => {
        const isExist = await this.checkExistLink(linkAddress);
        if (isExist) throw new Error(`already exist link ${linkAddress}`);
        await db.address.create({
            linkAddress,
            owner_address: ownerAddress
        });
    };

    checkExistLink = async (linkAddress: string) => {
        return !!db.link.findByPk(linkAddress);
    }

    getOwner = async (linkAddress: string) => {
        const linkaddress = db.address.findByPk(linkAddress);
        if (!linkaddress) throw new Error(`not found linkaddress ${linkAddress}`);
        return linkaddress.owner_Address;
    };

    linkAddress = async (linkAddress: string, accountAddress: string, symbol: string) => {
        const isExist = await this.checkExistLink(linkAddress);
        if (!isExist) throw new Error(`not found linkaddress ${linkAddress}`);
        await this.unlinkAddress(linkAddress, symbol);
        await db.link.create({ linkAddress, account_address: accountAddress, symbol });
    }

    getAddress = async (linkAddress: string, symbol: string) => {
        const address = await db.address.findOne({ where: { linkAddress, symbol } });
        if (!address) throw new Error(`not linked ${linkAddress} ${symbol}`);
        return address.address;
    }

    unlinkAddress = async (linkAddress: string, symbol: string) => {
        await db.link.destroy({ where: { linkAddress, symbol } });
    }

}