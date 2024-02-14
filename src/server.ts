import express, { Request, Response } from "express";

const port = 3500;

const app = express();
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Nodejs Typescript  ");
});

app.listen(port, async () => {
  console.log(`App is running at localhost:${port}`);
});
