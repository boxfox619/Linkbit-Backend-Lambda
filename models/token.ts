import { TableModel } from "./tableModel";

export class Token extends TableModel {
  static TableName: string = 'token';
  public address: string;
  public token?: string;
  constructor(
    address: string,
    token?: string
  ) {
    super(Token.TableName);
    this.address = address;
    this.token = token;
  }

  get map(): { [key: string]: any } {
    return { address: this.address, token: this.token }
  }

}