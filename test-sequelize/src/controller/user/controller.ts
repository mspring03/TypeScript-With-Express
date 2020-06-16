import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const User = require("./query");

const signUpUser = async (req: Request, res: Response) => {
    const { userId, password, name } = req.body;
    
    if (await User.findUserById(userId)) 
        throw new Error('이미 있는 아이디');

    await User.userCreate(userId, password, name);
    res.status(200).json({ message: "회원가입 성공"}).end();
}

const signInUser = async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    const secret = req.app.get('jwt-secret');
    const user: any = await User.findUserById(userId);
    
    try {
        if (!user) { throw new Error("로그인 실패"); } 
        
        else if(user.password === password) {
            const token = await ((resolve, reject) => {
                jwt.sign({
                    id: user.id,
                    nick: user.nick,
                },
                secret,
                {
                expiresIn: '12h',
                }, (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                });
            });
            console.log(token);
            res.status(200).json({
                message: 'login success',
                token,
            }).end();
        }
    } catch (error) {
        res.status(403).json({ message: error.message }).end();
    }
}

module.exports = {
    signUpUser,
    signInUser
}