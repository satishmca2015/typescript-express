import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE as string, process.env.USERNAME as string, process.env.PASSWORD as string, {
    host: process.env.HOST,
    dialect: 'mysql',
    // logging: console.log, // Enable logging
});

export default sequelize;
