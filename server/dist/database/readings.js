"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ReadingSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    nodeID: String,
    H2S: Number,
    pH: Number,
    temp: Number,
    status: String,
    packet: String
});
// ReadingSchema.pre("save", function(next) {
//     const now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });
exports.Reading = mongoose.model("Reading", exports.ReadingSchema);
//# sourceMappingURL=readings.js.map