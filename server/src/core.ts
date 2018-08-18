// Inital server setup
// ----------------------------------------------------------------------------
import * as express from "express";
import * as http from "http";
const app = express();
export const App = app;
const server = http.createServer(app);
const io = require("socket.io")(server);
export const Server = server;


// Dependencies
// ----------------------------------------------------------------------------
import * as mongoose from "mongoose";
// import * as passport from "passport";
// export const Passport = passport;

// Utilities
// ----------------------------------------------------------------------------
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as logger from "morgan";
import * as fs from "fs";
import * as lusca from "lusca";
import * as mongo from "connect-mongo";
import * as path from "path";
// const flash = require("connect-flash");

// MongooseDB
// ----------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/above22water");
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
// Set where the view engine is getting its templates from
// app.set("views", path.join(__dirname, "../views"));
// // Setting the default page rendering engine
// app.set("view engine", "pug");
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
// Mounts the session store with an auto loader into MongooseDB
const MongoStore = require("connect-mongo")(session);
// Allows the session storage to be put into mongoose
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "rrrrrlabsessionsecret",
    store: new MongoStore({
        host: "127.0.0.1",
        port: "27017",
        db: "session",
        url: "mongodb://localhost:27017/rrrrrlab",
        autoReconnect: true
    })
}));
// Starts the user account session
// import { mountPassportLoginService } from "./config/passport";
// mountPassportLoginService(passport);

// app.use(passport.initialize());
// app.use(passport.session());
// Allows CORS
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// Pretty prints in console
app.use(errorHandler());
app.use(logger("dev"));
// One time use messages
// app.use(flash());
// Enables the better use of user account details
// app.use("*", (req: any, res: any, next: express.NextFunction) => {
//     res.locals.user = req.user;
//     next();
// });

// Ugly mess to get static file routing working properly
app.use(express.static(path.join(__dirname, "/../public")));
// app.use("/:a",          express.static(path.join(__dirname, "/../public")));
// app.use("/:a/:b",       express.static(path.join(__dirname, "/../public")));
// app.use("/:a/:b/:c",    express.static(path.join(__dirname, "/../public")));
// app.use("/:a/:b/:c/:d", express.static(path.join(__dirname, "/../public")));

// Prod vs Dev code and display
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
}
// else {
//     app.locals.pretty = true;
// }


import { mountAPIService } from "./controllers/api";
mountAPIService(app);


// The last route run
import { Request, Response } from "express";
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./../../../client/dist/index.html"));
});