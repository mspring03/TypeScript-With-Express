import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";
import { room } from "./room";

export class room_user extends Model<room_user> {
    room_r_id: number;
    user_u_id: number;
    room_user_name: string;
}

room_user.init(
    {
        room_r_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        u_id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false
        },
        room_user_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "room_user",
    }
);