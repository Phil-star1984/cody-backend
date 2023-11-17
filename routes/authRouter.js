import express from "express";
import * as authController from "../controller/authController.js";
const authRouter = express.Router();

authRouter
  .post("/signup", authController.signUp)
  .get("/:id", authController.getUser);

export default authRouter;
