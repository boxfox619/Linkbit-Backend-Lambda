import { TableModel } from "./tableModel";

export class LinkAddress extends TableModel {
  constructor(
    public address: string,
    public owner?: string
  ) {
    super('linkaddress');
  }

  get map(): { [key: string]: any } {
    return { address: this.address, owner: this.owner }
  }

}