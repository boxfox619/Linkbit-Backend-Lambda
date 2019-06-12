import AddressMap from "../models/addressMap";

export interface LinkUsecase {
    getAddressMap: (ownerAddress: string) => Promise<AddressMap[]>;
    linkAddress: (linkAddress: string, accountAddress: string, symbol: string) => Promise<void>;
    getLinkAddress: (linkAddress: string, symbol: string) => Promise<string>;
    unlinkAddress: (linkAddress: string, symbol: string) => Promise<void>;
}