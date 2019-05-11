import { Sequelize } from 'sequelize';
import AddressTable from './address';
import LinkTable from './link';
import config from '../config/dbconfig';

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {
    sequelize,
    address: AddressTable(sequelize),
    link: LinkTable(sequelize)
};

db.link.hasMany(db.address, {foreignKey: 'linkaddress'});

export default db;