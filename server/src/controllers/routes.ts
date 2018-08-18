// import { Router, Request, Response, NextFunction, Express } from "express";

// import { PassportStatic } from "passport";

// import { Account, AccountLevels } from "./../database/accounts";
// import { Node } from "./../database/nodes";

// export function mountRoutesService(app: Express, passport: PassportStatic) {

// // Account Pages
// // -------------------------------------------------------------

//     app.get("/login", function(req: Request, res: Response) {
//         if (req.isAuthenticated()) {
//             res.redirect("/profile");
//         } else {
//             res.render("login", { message: req.flash("loginMessage"), loggedIn: false });
//         }
//     });

//     app.post("/login", passport.authenticate("local-login", {
//         successRedirect : "/profile",
//         failureRedirect : "/login",
//         failureFlash : true
//     }));

//     app.get("/signup", function(req: Request, res: Response) {
//         if (req.isAuthenticated()) {
//             res.redirect("/profile");
//         } else {
//             res.render("signup", { message: req.flash("signupMessage"), loggedIn: false });
//         }
//     });

//     app.post("/signup", passport.authenticate("local-signup", {
//         successRedirect : "/profile",
//         failureRedirect : "/signup",
//         failureFlash : true
//     }));

//     app.get("/profile", isLoggedIn, function(req: Request, res: Response) {
//         res.render("profile", { user : req.user, loggedIn: true, username: req.user.username });
//     });

//     app.get("/logout", isLoggedIn, function(req: Request, res: Response) {
//         req.logout();
//         res.redirect("/");
//     });

//     function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//         if (req.isAuthenticated()) {
//             res.cookie("loggedInName", req.user.username, { httpOnly: false });
//             res.cookie("loggedInID", req.user._id, { httpOnly: false });
//             return next();
//         } else {
//             res.redirect("/login");
//         }
//     }

//     function isLoggedInAndAuthLvl(lvl: AccountLevels) {
//         return function(req: Request, res: Response, next: NextFunction) {
//             if (req.isAuthenticated()) {
//                 switch (lvl) {
//                     case AccountLevels.USER_GRAPHS:
//                         if (req.user.lvl == AccountLevels.ADMIN ||
//                             req.user.lvl == AccountLevels.USER_TERMINAL ||
//                             req.user.lvl == AccountLevels.USER_SETTINGS ||
//                             req.user.lvl == AccountLevels.USER_GRAPHS ) {
//                             next();
//                         }
//                         break;
//                     case AccountLevels.USER_SETTINGS:
//                         if (req.user.lvl == AccountLevels.ADMIN ||
//                             req.user.lvl == AccountLevels.USER_TERMINAL ||
//                             req.user.lvl == AccountLevels.USER_SETTINGS ) {
//                             next();
//                         }
//                         break;
//                     case AccountLevels.USER_TERMINAL:
//                         if (req.user.lvl == AccountLevels.ADMIN ||
//                             req.user.lvl == AccountLevels.USER_TERMINAL ) {
//                             next();
//                         }
//                         break;
//                     case AccountLevels.ADMIN:
//                         if (req.user.lvl == AccountLevels.ADMIN) {
//                             next();
//                         }
//                         break;
//                     default:
//                         res.render("404", { "error": "Auth check has defaulted" });
//                         break;
//                 }
//                 res.render("404", { "error": "You do not posses the required user level" });
//             } else {
//                 res.redirect("login");
//             }
//         };
//     }

// // Standard Pages
// // -------------------------------------------------------------

//     app.get("/", function(req: Request, res: Response) {
//         if (req.isAuthenticated()) {
//             res.redirect("/dashboard");
//         } else {
//             res.redirect("/login");
//         }
//     });

//     app.get("/dashboard", isLoggedIn, function(req: Request, res: Response) {
//         res.render("dashboard", {
//             loggedIn: true, username: req.user.username
//         });
//     });

//     app.get("/node/:id", isLoggedIn, function(req: Request, res: Response) {
//         // Check if the node exists and the user has access to it
//         if (req.isAuthenticated() && req.user.deviceIDs.includes(req.params.id)) {
//             Node.findOne({ deviceID: req.params.id }, function(err: Error, node: any) {
//                 if (err) res.redirect("/404/ErrorAccessingNode");
//                 if (!node) res.redirect("/404/NodeDoseNotExist");
//                 res.render("nodePage", {
//                     loggedIn: true, username: req.user.username,
//                     nodeID: node.deviceID
//                 });
//             });
//         } else {
//             res.redirect("/404/NotAuthentication");
//         }
//     });

// // 404 / Recovery
// // -------------------------------------------------------------

//     app.get("/404",  function(req: Request, res: Response) {
//         res.render("404");
//     });

//     app.get("/404/:msg",  function(req: Request, res: Response) {
//         res.render("404", { error: req.params.msg });
//     });

// }