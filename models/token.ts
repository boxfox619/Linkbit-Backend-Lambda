import { TableModel } from "./tableModel";

export class Token extends TableModel {
  constructor(
    public address: string,
    public token?: string
  ) { super('token'); }

  get map(): { [key: string]: any } {
    return { address: this.address, token: this.token }
  }

}