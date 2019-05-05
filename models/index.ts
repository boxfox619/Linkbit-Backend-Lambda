import { Sequelize } from 'sequelize';
import AddressTable from './address';
import LinkTable from './address';
import config from '../config/dbconfig';

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {
    sequelize,
    address: AddressTable(sequelize),
    link: LinkTable(sequelize)
};

export default db;