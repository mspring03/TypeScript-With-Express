import { sequelize } from '../config/Connection';
import Sequelize, { Model } from "sequelize";
import { room_user } from './room_user';
import { user_room } from './user_room';
import { message } from './message';


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

// User.hasMany(user_room, { foreignKey: 'u_id', sourceKey: 'user_u_id' }); 
// user_room.belongsTo(User, { foreignKey: 'u_id', targetKey: 'user_u_id' }); 

// User.hasMany(room_user, { foreignKey: 'u_id', sourceKey: 'user_u_id' }); 
// room_user.belongsTo(User, { foreignKey: 'u_id', targetKey: 'user_u_id' }); 

// User.hasOne(user_connection, { foreignKey: 'u_id', sourceKey: 'user_u_id' }); 
// user_connection.belongsTo(User, { foreignKey: 'u_id', targetKey: 'user_u_id' }); 

// User.hasMany(message, { foreignKey: 'u_id', sourceKey: 'user_u_id' }); 
// message.belongsTo(User, { foreignKey: 'u_id', targetKey: 'user_u_id' }); 