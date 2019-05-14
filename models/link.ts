import { TableModel } from "./tableModel";

export class Link extends TableModel {
  constructor(
    public address: string,
    public symbol?: string,
    public account?: string
  ) {
    super('link');
  }
  
  get map(): { [key: string]: any; } {
    return {
      address: this.address,
      symbol: this.symbol,
      account: this.account
    }
  };
}