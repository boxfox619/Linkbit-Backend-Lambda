import { Sequelize } from 'sequelize';
import AddressTable, { Address } from './address';
import LinkTable, { Link } from './link';
import config from '../config/dbconfig';

export interface Database {
    sequelize: Sequelize,
    address: typeof Address,
    link: typeof Link
}
export const sequelize = new Sequelize(config.database, config.username, config.password, config);
export const createDatabase = (sequelize: Sequelize): Database => {
    const db = {
        sequelize,
        address: AddressTable(sequelize),
        link: LinkTable(sequelize)
    };
    db.link.hasMany(db.address, { foreignKey: 'linkaddress' });
    return db;
};
export { response, missingParameters } from './response';