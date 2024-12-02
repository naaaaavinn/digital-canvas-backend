import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./mongodb/connect.js";
import postRoute from "./routes/post.js";
import canvasRoute from './routes/digitalCanvas.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "15mb" }));

app.use("/api/v1/post", postRoute);
app.use("/api/v1/canvas", canvasRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node");
});

const startServer = () => {
  try {
    connectDb(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
  app.listen(8080, () =>
    console.log("Server has started on http://localhost:8080")
  );
};

startServer();
