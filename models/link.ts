import * as Sequelize from 'sequelize';

export default (sequelize: Sequelize.Sequelize) => sequelize.define('link', LinkTable);

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