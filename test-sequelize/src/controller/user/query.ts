const User = require("../../models/user").User;

const findOne = async (userId: string): Promise<Object> => {
    const user: any = await User.findOne({
        attributes: [ "userID", "password", "name" ],
        where: { userId: userId }
    });

    if(user != null) 
    return user.dataValues;
    return user;
}

const create = async (userId: string, password: string, name: string, introduce: string) => {
    const date = new Date();
    
    await User.create({
        userId: userId,
        password: password,
        name: name,
        introduce: introduce,
        connection: 0,
        last_online: `${date.getFullYear()}년/0${date.getMonth() + 1}월/${date.getDate()}일`
    });
}

export const findUserById = async (userId: string): Promise<Object> => {
    try {
        const user: any = await findOne(userId);
        return user;
    } catch (error) {
        throw error
    }
};

export const userCreate = async (userId: string, password: string, name: string, introduce: string) => {
    try {
        create(userId, password, name, introduce);
    } catch (error) {
        throw error
    }
}