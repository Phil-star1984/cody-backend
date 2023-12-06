import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
/* import { errorHandler } from "./middlewares/errorHandler.js"; */

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import "./db/mongoDB.js";

const PORT = process.env.PORT || 5008;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cody-app.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.listen(PORT, (req, res) => {
  console.log(`Example App listening on Port: ${PORT}`);
});
