"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.NodeSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    loc: {
        lat: Number,
        long: Number,
        address: String,
        location: String,
    },
    deviceID: String,
    simNumber: String
});
exports.Node = mongoose.model("Nodes", exports.NodeSchema);
//# sourceMappingURL=nodes.js.map