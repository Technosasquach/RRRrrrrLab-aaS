"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inital server setup
// ----------------------------------------------------------------------------
const express = require("express");
const http = require("http");
const app = express();
exports.App = app;
const server = http.createServer(app);
exports.Io = require("socket.io")(server);
exports.Server = server;
// Dependencies
// ----------------------------------------------------------------------------
const mongoose = require("mongoose");
// import * as passport from "passport";
// export const Passport = passport;
// Utilities
// ----------------------------------------------------------------------------
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const lusca = require("lusca");
const path = require("path");
// const flash = require("connect-flash");
// MongooseDB
// ----------------------------------------------------------------------------
//mongoose.connect("mongodb://localhost:27017/above22water");
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
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
// Mounts the session store with an auto loader into MongooseDB
//const MongoStore = require("connect-mongo")(session);
// Allows the session storage to be put into mongoose
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: "rrrrrlabsessionsecret",
//     store: new MongoStore({
//         host: "127.0.0.1",
//         port: "27017",
//         db: "session",
//         url: "mongodb://localhost:27017/rrrrrlab",
//         autoReconnect: true
//     })
// }));
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
app.use("/storage/", express.static(path.join(__dirname, "./../../storage/")));
app.use(express.static(path.join(__dirname, "./../../client/dist")));
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
const api_1 = require("./controllers/api");
api_1.mountAPIService(app);
this.Io.emit('broadcast', { msg: "Im Alive!" });
setInterval(() => { exports.Io.emit('broadcast', { msg: "Im Alive! Time: " + new Date(new Date().getTime()).toString() }); console.log("Broadcast"); }, 10000);
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../../client/index.html"));
});
// app.get("/bundle.js", (req: Request, res: Response) => {
//     res.sendFile(path.resolve(__dirname, "./../../client/dist/bundle.js"))
// })
//# sourceMappingURL=core.js.map