import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('typescript_express', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: console.log, // Enable logging
});

export default sequelize;
