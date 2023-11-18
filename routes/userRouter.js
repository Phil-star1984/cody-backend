import express from "express";
import * as userController from "../controller/userController.js";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .post(userController.updateUser)

export default userRouter;
