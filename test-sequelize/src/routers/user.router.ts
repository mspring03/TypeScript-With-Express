const express = require("express");
const userController = require("../controller/user/controller");
const middleware = require("../middleware/errorHandler");

const router = express.Router();
const signUpHandler = middleware.tryCatchMiddleware(userController.signUpUser);
const signInHandler = middleware.tryCatchMiddleware(userController.signInUser);

router.post("/signup", signUpHandler);
router.post("/signin", signInHandler);

export default router;