const User = require("../../models/user").user;
const room = require("../../models/room").room;
const user_query = require("../user/query");
const user_room = require("../../models/user_room").user_room;
const room_user = require("../../models/room_user").room_user;

const create = async (u_id: number, userId: string, room_name: string) => {
    const findOneUser = await user_query.findOne(userId);
    const user = await room.create({
        room_name: room_name
    });
    await userInvite(u_id, user.dataValues.r_id, userId, findOneUser.name);
}

export const userInvite = async (u_id: number, r_id: number, user_id: string, user_name: string) => {
    await user_room.create({
        user_u_id: u_id,
        user_r_id: r_id
    });
    await room_user.create({
        user_id: user_id,
        room_r_id: r_id,
        user_name: user_name
    });
}

export const createRoom = async (u_id: number, userId: string, room_name: string): Promise<void> => {
    try {
        await create(u_id, userId, room_name);
    } catch (error) {
        throw error;
    }
}

export const showRoom = async (u_id: number) => {
    try {
        const Room = await room.findAll({
                attributes: [ "room_name" ],
                include: [{
                    model: user_room,
                    attributes: [ 'user_u_id' ]                
                },
                {
                    model: room_user,
                    attributes: [ 'user_name' ]
                }],
                where: { 'user_room.user_u_id': u_id }
            });
        return Room.dataValues;
    } catch (error) {
        throw error;
    }
}

export const Delete = async (r_id: number): Promise<void> => {
    try {
        room.destory({ where: { r_id: r_id }});
        room_user.destory({ where: { room_r_id: r_id }});
        room.destory({ where: { user_r_id: r_id }});
    } catch (error) {
        throw error;
    }
}