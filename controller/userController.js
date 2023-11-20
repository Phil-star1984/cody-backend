import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

//Get All Users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find();
  if (!allUsers) throw new ErrorResponse("No users in Database", 404);
  res.send(allUsers);
});

//Get User
export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) throw new ErrorResponse("User does not exist", 404);

  res.send(user);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse(`No user found with ID: ${id}`);

  res.status(200).json({ message: "User sucessfully deleted!", user });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      password,
    },
    { new: true }
  );

  if (!user) throw new ErrorResponse("No user to update", 404);
  res.status(200).json({ message: "User sucessfully updated!" });
});
