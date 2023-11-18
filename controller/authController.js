import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
/* import errorHandler from "../middlewares/errorHandler.js"; */

//User signUp
export const signUp = asyncHandler(async (req, res, next) => {
  /* const { id } = req.params; */
  const { firstName, lastName, email, password } = req.body;

  /* Check if user exists */
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);

  const hash = await bcrypt.hash(password, 10);

  /* Create user in Database */
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ status: "success" });
});

//User signIn
export const singIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ErrorResponse("User does not exist", 404);

  const match = bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse("Wrong Password", 401);

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1800000,
  });

  res.status(200).send();
});

//Get User
export const getUser = asyncHandler(async (req, res, next) => {
  console.log(req.uid);
  const user = await User.findById(req.uid, { password: 0 });
  res.json(user);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).send({ status: "success" });
});
