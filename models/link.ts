import { TableModel } from "./tableModel";

export class Link extends TableModel {
  public static TableName = 'link';
  constructor(
    public address: string,
    public symbol?: string,
    public account?: string
  ) {
    super();
  }
  
  get map(): { [key: string]: any; } {
    return {
      address: this.address,
      symbol: this.symbol,
      account: this.account
    }
  };
}