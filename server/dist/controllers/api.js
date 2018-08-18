"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.mountAPIService = mountAPIService;
//# sourceMappingURL=api.js.map