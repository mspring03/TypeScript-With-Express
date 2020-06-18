import { sequelize } from "../config/Connection";
import Sequelize, { Model } from 'sequelize';
import { room_user } from './room_user';
import { user_room } from './user_room';
import { message } from './message';

export class room extends Model<room> {
    r_id: number;
    room_name: string;
}

room.init(
    {
        r_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        room_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: "room",
    }
);

// room.hasMany(room_user, { foreignKey: 'r_id', sourceKey: 'room_r_id' }); 
// room_user.belongsTo(room, { foreignKey: 'r_id', targetKey: 'room_r_id' }); 

// room.hasMany(user_room, { foreignKey: 'r_id', sourceKey: 'room_r_id' }); 
// user_room.belongsTo(room, { foreignKey: 'r_id', targetKey: 'room_r_id' });

// room.hasMany(message, { foreignKey: 'r_id', sourceKey: 'room_r_id' }); 
// message.belongsTo(room, { foreignKey: 'r_id', targetKey: 'room_r_id' }); 

