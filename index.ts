import BodyParser from "body-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import * as http from "http";
import mongoose, { ConnectOptions } from "mongoose";
import error from "./helpers/response/error";

// Routes
import ApplicationRouter from "./controllers/application";
import AuthRouter from "./controllers/auth";
import JobRouter from "./controllers/job";

require("dotenv").config();

// @ts-ignore
const app: Application & { oauth: OAuthServer } = express();

// THIS STRING IS THE LINK TO OUR MONGODB
const mongodbConnectionUrl = process.env.MONGODB_CONNECTION_URL || "";

//Initializations
app.use(cors());
const JsonParser = BodyParser.json({ limit: "50mb" });
app.use(JsonParser);

// mongodb connection
mongoose.connect(mongodbConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
} as ConnectOptions);
mongoose.Promise = global.Promise;

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4000;

const SERVER_PREFIX = "/api/v1";

//Routes
app.use(`${SERVER_PREFIX}/auth`, AuthRouter);
app.use(`${SERVER_PREFIX}/job`, JobRouter);
app.use(`${SERVER_PREFIX}/application`, ApplicationRouter);

// Handle Error
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(422).send({ error: error.message });
  }
);

app.use(
  "*",
  express
    .Router()
    .all("/", (request: Request, response: Response, next: NextFunction) =>
      response.status(404).json(error(null, "Request could not be handled"))
    )
);

//Start the server
httpServer.listen(PORT, undefined, async () => {
  console.log("Server is Online");
});
