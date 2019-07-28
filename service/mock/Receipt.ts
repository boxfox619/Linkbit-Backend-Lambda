import { Receipt } from "../../models/entity";

export class ReceiptObject implements Receipt {
    constructor(
        public count: number,
        public price: number
    ) { }
}