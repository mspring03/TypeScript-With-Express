import { Request, Response } from "express";
const User = require("../models/user").User;

const findUserById = async (userId: string): Promise<Object> => {
    try {
        const user = await User.findOne({
            where: {
                userId: userId,
            },
        });
        return user;
    } catch (error) {
        return error
    }
};


const signUpUser = async (req: Request, res: Response) => {
    const userValue = req.body;
    const cheak = await findUserById(userValue.userId);
    console.log(cheak);
    try {
        if (!cheak) {
            await User.create({
                userId: userValue.userId,
                password: userValue.password,
                name: userValue.name
            });
            res.status(200).json({
                message: "성공"
            });
        } 
        else res.status(500).json({
            message: "이미 있는 아이디."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    signUpUser,
}