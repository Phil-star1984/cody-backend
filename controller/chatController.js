import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import fetch from "node-fetch";
import "dotenv/config";
import Chat from "../models/UserChat.js";

const endpointUrl = "https://api.openai.com/v1/chat/completions";

export const chatCompletion = asyncHandler(async (req, res, next) => {
  const { user_input, userId } = req.body;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: user_input }],
      max_tokens: 20,
    }),
  };

  const response = await fetch(endpointUrl, options);
  const data = await response.json();
  if (!data) {
    return next(new ErrorResponse("No data available", 401));
  }
  res.send(data.choices[0].message.content);

  const saveChat = await Chat.create({
    author: userId,
    userInput: user_input,
    chatgptResponse: data.choices[0].message.content,
  });
});

export const getAllChats = asyncHandler(async (req, res, next) => {
  const allChats = await Chat.find().populate("author");

  if (!allChats) throw new ErrorResponse("There are no Chats", 404);

  res.send(allChats);
});

export const getUserSpecificChat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const result = await Chat.find({ author: { _id: id } });

  if (!result)
    throw new ErrorResponse(`There are no chats from user with ID:${id}`);

  res.send(result);
});
