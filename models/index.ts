import { Sequelize } from 'sequelize';
import AddressTable, {Address} from './address';
import LinkTable, {Link} from './link';
import config from '../config/dbconfig';

interface Database {
    sequelize: Sequelize,
    address: typeof Address,
    link: typeof Link
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db: Database = {
    sequelize,
    address: AddressTable(sequelize),
    link: LinkTable(sequelize)
};

db.link.hasMany(db.address, {foreignKey: 'linkaddress'});

export default db;
export { response, missingParameters } from './response';