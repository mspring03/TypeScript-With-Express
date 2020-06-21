const User = require("../../models/user").user;
const room = require("../../models/room").room;

const findAllById = async (u_id: number): Promise<object> => {
    const user: any = await User.findAll({
        attributes: ['u_id', 'userId', 'name', 'introduce'],
        where: {
            name: u_id
        }
    });
    return user.dataValues;
}

const findOneByToken = async (token: string) => {
    const user: any = await User.findOne({
        attributes: ['u_id', 'userId', 'name', 'connection'],
        where: {
            token: token
        }
    });

    return user.dataValues;
}

const changeOnline = async (userId: string) => {
    await User.update({
        connection: true
    }, {
        where: { userId: userId }
    });
}

const changeOffline = async (userId: string) => {
    await User.update({
        connection: false
    }, {
        where: { userId: userId }
    });
}

export const allUserFindById = async (u_id: number): Promise<object> => {
    try {
        const user: object = await findAllById(u_id);
        return user;
    } catch (error) {
        throw error;
    }
}

export const oneUserFindByToken = async (token: string): Promise<object> => {
    try {
        const user: any = await findOneByToken(token);
        return user;
    } catch (error) {
        throw error;
    }
}

export const changeConnection = async (userId: string, connection: boolean): Promise<void> => {
    connection == true ? changeOffline(userId) : changeOnline(userId);
}

export const showUser = async (): Promise<object> => {
    const user = User.findAll({
        attributes: [ "u_id", "name", "profile_img", "introduce"]
    });
    return user.dataValues;
}
