import { Table } from "./table";
import { LinkAddressEntity } from "../entity";

export class LinkAddress extends Table implements LinkAddressEntity {
  static TableName = 'linkaddress';
  public address: string;
  public owner?: string;
  constructor(
    address?: string,
    owner?: string
  ) {
    super(LinkAddress.TableName);
    this.address = address;
    this.owner = owner;
  }

  get map(): { [key: string]: any } {
    return { address: this.address, owner: this.owner }
  }

}