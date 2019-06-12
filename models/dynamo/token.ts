import { Table } from "./table";
import { TokenEntity } from "../entity";

export class Token extends Table implements TokenEntity {
  static TableName: string = 'token';
  constructor(
    public address: string,
    public token?: string
  ) {
    super(Token.TableName);
    this.address = address;
    this.token = token;
  }

  get map(): { [key: string]: any } {
    return { address: this.address, token: this.token }
  }

}