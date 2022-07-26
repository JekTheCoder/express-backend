import 'dotenv/config';
import { Sequelize } from 'sequelize';

const method = process.env.DB_METHOD || '';
const user = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD || '';
const host = process.env.DB_HOST || '';
const PORT = process.env.DB_PORT || 3306;
const database = process.env.DB_NAME || '';

const sequelize = new Sequelize(`${method}://${user}:${password}@${host}:${PORT}/${database}`);

export default sequelize;