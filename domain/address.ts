export interface AddressUsecase {
    getOwner: (linkAddress: string) => Promise<string>
    createAddress: (linkAddress: string, ownerAddress) => Promise<void>;
    linkAddress: (linkAddress: string, accountAddress: string, symbol: string) => Promise<void>
    getAddress: (linkAddress: string, symbol: string) => Promise<string>
    unlinkAddress: (linkAddress: string, symbol: string) => Promise<void>
    checkExistLink: (linkAddress: string) => Promise<boolean>
}