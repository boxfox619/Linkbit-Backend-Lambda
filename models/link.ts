import { TableModel } from "./tableModel";

export class Link extends TableModel {
  static TableName = 'link';
  public address: string;
  public symbol?: string;
  public account?: string;
  constructor(
    address: string,
    symbol?: string,
    account?: string
  ) {
    super(Link.TableName);
    this.address = address;
    this.symbol = symbol ? symbol.toUpperCase() : undefined;
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