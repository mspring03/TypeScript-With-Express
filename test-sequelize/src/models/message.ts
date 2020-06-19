import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class message extends Model<message> {
    room_r_id: number;
    message: string;
    profile_img: string;
    timestamp: string;
    user_u_id: number;
    name: string
}

message.init(
    {
        message: {
            type: Sequelize.STRING
        },
        profile_img: {
            type: Sequelize.STRING
        },
        timestamp: {
            type: Sequelize.TIME,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "message",
    }
);