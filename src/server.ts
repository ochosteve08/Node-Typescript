import express, { Request, Response } from "express";
import mongoose from "mongoose";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./doc/swagger.json";

const port = 3500;

const app = express();
const mongo_url = "mongodb://127.0.0.1:27017/node-ts";

mongoose.Promise = Promise;
mongoose.connect(mongo_url);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.get("/docs.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});
app.use("/", router);
app.get("/", (req: Request, res: Response) => {
  console.log(req.method);
  res.status(200).send("Welcome to Nodejs Typescript  ");
});

app.listen(port, async () => {
  console.log(`App is running at localhost:${port}`);
});
