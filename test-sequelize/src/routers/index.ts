const express = require("express");
import userRouter from '../routers/user.router';

const router = express.Router();

router.use("/user", userRouter);

export default router;