import { Request, Response } from "express";

type handlerFunc = (req: Request, res: Response) => void ;

const tryCatchMiddleware = (myFunc: handlerFunc):handlerFunc => {
    return async (req: Request, res: Response) => {
        try {
            await myFunc(req, res);
        } catch (e) {
            res.status(500).json({ message: e.message }).end();
        }
    }
}

module.exports = {
    tryCatchMiddleware,
}