import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";
import { room } from "./room";

export class room_user extends Model<room_user> {
    user_id;
    user_name: string;
}

room_user.init(
    {
        user_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "room_user",
    }
);