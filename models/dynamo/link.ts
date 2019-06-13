import { Table } from "./table";
import { LinkEntity } from "../entity";

export class Link extends Table implements LinkEntity {
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