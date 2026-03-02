import express from "express";
import { signup, login, logout, protect, getAuthenticatedUser} from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(protect, logout);
userRouter.route("/me").get(protect, getAuthenticatedUser);

export default userRouter;