const express = require("express");
const userController = require("../controller/user/controller");
const middleware = require("../middleware/errorHandler");

const router = express.Router();
const signUpHandler = middleware.tryCatchMiddleware(userController.signUpUser);

router.post("/signup", signUpHandler);
router.post("/signin", userController.signInUser);

export default router;