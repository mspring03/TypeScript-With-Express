import { sequelize } from "../config/Connection";
import Sequelize, { Model } from "sequelize";

export class user_room extends Model<user_room> {
}

user_room.init(
    {},
    {
        sequelize,
        modelName: "user_room",
    }
);