import { TableModel } from "./tableModel";

export class LinkAddress extends TableModel {
  public address: string;
  public owner?: string;
  constructor(
    address: string,
    owner?: string
  ) {
    super('linkaddress');
    this.address = address;
    this.owner = owner;
  }

  get map(): { [key: string]: any } {
    return { address: this.address, owner: this.owner }
  }

}