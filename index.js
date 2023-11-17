import "dotenv/config";
import express from "express";
import cors from "cors";
/* import { errorHandler } from "./middlewares/errorHandler.js"; */

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import "./db/mongoDB.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, (req, res) => {
  console.log(`Example App listening on Port: ${PORT}`);
});
