export default class AddressMap {
    constructor(
        public ownerAddress: string,
        public linkAddress: string,
        public accountAddressMap: { [symbol: string]: string } = {}
    ) { }
}