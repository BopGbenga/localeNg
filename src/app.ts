// import express from "express";
import express from "express";
import dotenv from "dotenv";
import connect from "./database/db";
import userRoute from "./User/userRoute";
import localerouter from "./locale/localeRouter";
import bodyParser = require("body-parser");
import { Express, Request, Response } from "express";

dotenv.config();

//conncet to db
connect();

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use("/users", userRoute);
app.use("/v1", localerouter);

app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to my API!");
});

app.listen(port, () => {
  console.log(`server runnning on ${port}`);
});
