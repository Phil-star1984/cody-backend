import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
/* import errorHandler from "../middlewares/errorHandler.js"; */

//Get User
export const getUser = asyncHandler(async (req, res, next) => {
  console.log(req.uid);

  const user = await User.findById(req.uid, { password: 0 });
  res.json(user);
});

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
