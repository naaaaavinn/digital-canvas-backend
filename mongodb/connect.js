import mongoose from "mongoose";

function connectDb(url) {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));
}

export default connectDb;
