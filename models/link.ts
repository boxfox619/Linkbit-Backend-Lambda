import { TableModel } from "./tableModel";

export class Link extends TableModel {
  public address: string;
  public symbol?: string;
  public account?: string;
  constructor(
    address: string,
    symbol?: string,
    account?: string
  ) {
    super('link');
    this.address = address;
    this.symbol = symbol;
    this.account = account;
  }

  get map(): { [key: string]: any; } {
    return {
      address: this.address,
      symbol: this.symbol,
      account: this.account
    }
  };
}