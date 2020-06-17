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

const create = async (userId: string, password: string, name: string) => {
    await User.create({
        userId: userId,
        password: password,
        name: name,
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

export const userCreate = async (userId: string, password: string, name: string) => {
    try {
        create(userId, password, name);
    } catch (error) {
        throw error
    }
}