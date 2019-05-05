import * as Sequelize from 'sequelize';

export default (sequelize: Sequelize.Sequelize) => sequelize.define('address', AddressTable);

export const AddressTable = {
    linkaddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    owner_public_key: {
      type: Sequelize.STRING,
      allowNull: false
    }
}