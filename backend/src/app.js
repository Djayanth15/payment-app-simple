import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//for basic middleware
//we use cors so that our frontend can hit our backend server
//for all the data we might receive we used to have body-parser thats already included in express now
//we use express.json to parse json objects
//we use urlencoded for parsing data from the url
//we  use express.static to store all the static public files(like favicon,etc) in our public folder
//from my backend server i can access(validate) user's cookies present in the browser and also create(CRUD) - secure cookies

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Import Routes
import userRoutes from "./routes/user.routes.js";
import accountRoutes from "./routes/account.routes.js";

//routes decleration
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

export default app;
