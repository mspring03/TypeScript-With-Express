import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class User extends Model<User> {
    id: number;
    userId: string;
    password: string;
    name: string;
}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "User",
        schema: "testServer"
    }
);


    