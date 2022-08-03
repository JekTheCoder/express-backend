import 'dotenv/config';
import { Sequelize } from 'sequelize';

const method = process.env.DB_METHOD || '';
const user = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const PORT = process.env.DB_PORT || 3306;
const database = process.env.DB_NAME || '';

const sequelize = new Sequelize(`${method}://${user}:${password}@${host}:${PORT}/${database}`);

sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    .then(() => sequelize.sync({ force: true }))
    .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1;'))

export default sequelize;