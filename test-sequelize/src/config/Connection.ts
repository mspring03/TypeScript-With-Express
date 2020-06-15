import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "testServer",
    "root",
    "메롱",
    {
        host: "127.0.0.1",
        dialect: "mysql",
        define: {
            timestamps: false
        },
        timezone: "+09:00",
        pool: {
            max: 30,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);