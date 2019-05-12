import * as Sequelize from 'sequelize';
import { Model } from 'sequelize';

export class Address extends Model { }

export default (sequelize: Sequelize.Sequelize) => {
  Address.init(AddressTable, { sequelize, tableName: 'address', freezeTableName: true, timestamps: false });
  return Address;
}

export const AddressTable = {
  linkaddress: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  owner_address: {
    type: Sequelize.STRING,
    allowNull: false
  }
}