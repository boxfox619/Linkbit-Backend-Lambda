export interface AddressUsecase {
    getOwner: (linkAddress: string) => Promise<string>;
    getAddressList: (ownerAddress: string) => Promise<string[]>;
    createAddress: (linkAddress: string, ownerAddress) => Promise<void>;
    deleteAddress: (linkaddress: string) => Promise<void>;
    checkExistLink: (linkAddress: string) => Promise<boolean>;
}