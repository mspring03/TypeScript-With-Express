const express = require("express");
import userRouter from './user.Router';

const router = express.Router();

router.use("/user", userRouter);

export default router;