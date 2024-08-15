const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const NotFoundHandler = require("./src/utils/not-found.handler");
const ErrorHandler = require("./src/utils/error.handler");
const mainRouter = require("./main.routes");
const cookieParser = require("cookie-parser");
dotenv.config();
const main = () => {
  const app = express();
  const port = process.env.PORT;
  require("./src/config/mongoDB.config");
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(mainRouter);
  NotFoundHandler(app);
  ErrorHandler(app);
  app.listen(port, () => {
    console.log(`server : http://localhost:${port}`);
  });
};
main();
