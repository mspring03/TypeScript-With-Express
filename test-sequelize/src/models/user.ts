import { sequelize } from '../config/Connection';
import Sequelize, { Model } from "sequelize";
import { room_user } from './room_user';
import { user_room } from './user_room';
import { message } from './message';
import { room } from './room';


export class User extends Model<User> {
    u_id: number;
    userId: string;
    password: string;
    name: string;
    profile_img: string;
    introduce: string;
    connection: boolean;
    last_online: string;
    token: string;
}

User.init(
    {
        u_id: {
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
        },
        profile_img: {
            type: Sequelize.STRING,
        },
        introduce: {
            type: Sequelize.STRING,
            allowNull: true
        },
        connection: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        last_online: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        modelName: "User",
    }
);

User.hasMany(user_room, { foreignKey: 'user_u_id', sourceKey: 'u_id' }); 
user_room.belongsTo(User, { foreignKey: 'user_u_id', targetKey: 'u_id' }); 

User.hasMany(room, { foreignKey: 'room_u_id', sourceKey: 'u_id' });
room.belongsTo(User, { foreignKey: 'room_u_id', targetKey: 'u_id' });

User.hasMany(message, { foreignKey: 'user_u_id', sourceKey: 'u_id' }); 
message.belongsTo(User, { foreignKey: 'user_u_id', targetKey: 'u_id' }); 