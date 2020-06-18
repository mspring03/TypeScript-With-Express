import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class user_connection extends Model<user_connection> {
    user_u_id: number;
    connection: boolean;
    last_online: Date;
}

user_connection.init(
    {
        user_u_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        connection: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        last_online: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "user_connection",
    }
);