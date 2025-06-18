import { Sequelize } from "sequelize";

// Conexão com o bando de dados MySql
const sequelize = new Sequelize('postapp', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

export default { Sequelize: Sequelize, sequelize: sequelize }