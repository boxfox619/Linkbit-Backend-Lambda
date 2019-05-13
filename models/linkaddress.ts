import { TableModel } from "./tableModel";

export class LinkAddress extends TableModel {
  public static TableName = 'linkaddress';
  constructor(
    public address: string,
    public owner?: string
  ) {
    super();
  }

  get map(): { [key: string]: any } {
    return { address: this.address, owner: this.owner }
  }

}