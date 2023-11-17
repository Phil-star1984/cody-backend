import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://Phil:${process.env.MONGO_DB}@test.nwktpel.mongodb.net/`
  )
  .then(() => console.log("Connected to MongoDB Database Test!"))
  .catch((error) => {
    console.log(`Error connecting to MongoDB ${error}`);
  });

export default mongoose;
