export default class AddressMap {
    constructor(
        public ownerAddress: string,
        public linkaddress: string,
        public accountAddressMap: { [symbol: string]: string } = {}
    ) { }
}