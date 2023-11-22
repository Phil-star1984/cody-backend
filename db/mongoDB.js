import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB Database Test!"))
  .catch((error) => {
    console.log(`Error connecting to MongoDB ${error}`);
  });

export default mongoose;
