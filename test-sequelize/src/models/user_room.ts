import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class user_room extends Model<user_room> {
    user_u_id: number;
    room_r_id: number;
}

user_room.init(
    {
        user_u_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        room_r_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "user_room",
    }
);