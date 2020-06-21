const Message = require("../../models/message").message;

export const create = async (u_id: number, r_id: number, message: string, 
    profile_img: string, timestamp: string, name: string) => {
    await Message.create({
        user_u_id: u_id,
        room_r_id: r_id,
        message: message,
        profile_img: profile_img,
        timestamp: timestamp,
        name: name
    });
}

export const lastChat = async (r_id: number): Promise<string> => {
    const message = await Message.findAll({
        where: { room_r_id: r_id },
        limit: 1,
    })
    return message.dataValues.message;
}

export const tenChat = async (r_id: number): Promise<object> => {
    const message = await Message.findAll({
        where: { room_r_id: r_id },
        attributes: [ 'message' ],
        limit: 10,
    })
    return message.dataValues;
}