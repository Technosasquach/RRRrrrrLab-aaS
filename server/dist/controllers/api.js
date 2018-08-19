"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeRunner_1 = require("../utils/codeRunner");
function mountAPIService(app) {
    // API Pages
    // -------------------------------------------------------------
    app.post("/api/", function (req, res) {
        res.json({
            message: "The API service is alive.",
            time: Date.now()
        });
    });
    // Returns deny msg
    app.use("/api/deny", function (req, res) {
        res.json({
            message: "You do not have access/can not find this resource"
        });
    });
    // Returns deny msg plus what ever extra given
    app.use("/api/deny/:msg", function (req, res) {
        res.json({
            message: "You do not have access/can not find this resource",
            note: req.params.msg
        });
    });
    // Returns basic information on the account the user has
    app.get("/api/account", function (req, res) {
        // res.json({
        //     username: req.user.username,
        //     createdAt: req.user.createdAt || Date.now(),
        //     lvl: req.user.level || 999,
        //     deviceIDs: req.user.deviceIDs
        // });
    });
    // Returns basic information on the node id given
    app.get("/api/node/:id", function (req, res) {
    });
    app.post("/api/execText", (req, res) => {
        console.log(req.body.code);
        codeRunner_1.CodeRunner.execFunction(req.body.code)
            .then((output) => {
            res.json(Object.assign({}, output, { date: Date.now() }));
        })
            .catch((output) => {
            if (output) {
                res.json(Object.assign({}, output, { date: Date.now() }));
            }
            else {
                res.json({
                    err: {
                        type: "execText API Error",
                        raw: "Major top level error in API"
                    },
                    date: Date.now()
                });
            }
        });
    });
    app.post("/api/execFile", (req, res) => {
        codeRunner_1.CodeRunner.execFileFunction(req.body.codePath)
            .then((output) => {
            res.json(Object.assign({}, output, { date: Date.now() }));
        })
            .catch((output) => {
            if (output) {
                res.json(Object.assign({}, output, { date: Date.now() }));
            }
            else {
                res.json({
                    err: {
                        type: "execFile API Error",
                        raw: "Major top level error in API"
                    },
                    date: Date.now()
                });
            }
        });
    });
}
exports.mountAPIService = mountAPIService;
//# sourceMappingURL=api.js.map