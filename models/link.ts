import * as Sequelize from 'sequelize';
import { Model } from 'sequelize';

export class Link extends Model { }

export default (sequelize: Sequelize.Sequelize) => {
  Link.init(LinkTable, { sequelize, tableName: 'link', freezeTableName: true, timestamps: false });
  return Link;
}

export const LinkTable = {
  linkaddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  account_address: {
    type: Sequelize.STRING,
    allowNull: false
  }
}