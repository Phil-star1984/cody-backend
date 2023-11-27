import express from "express";
import * as authController from "../controller/authController.js";
const authRouter = express.Router();
import verifyToken from "../middlewares/verifyToken.js";

authRouter
  .post("/signup", authController.signUp)
  .post("/signin", authController.signIn)
  .get("/me", verifyToken, authController.getUser);

export default authRouter;
