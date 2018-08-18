import * as mongoose from "mongoose";

export interface IReadingsModel extends mongoose.Document {
    createdAt: Date;
    nodeID: string;
    H2S: number;
    pH: number;
    temp: number;
    status: string;
    packet: string;
}

export const ReadingSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : {
        type: Date,
        default: Date.now
    },
    nodeID : String,
    H2S : Number,
    pH : Number,
    temp : Number,
    status : String,
    packet : String
});

// ReadingSchema.pre("save", function(next) {
//     const now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });

export const Reading: mongoose.Model<IReadingsModel> = mongoose.model<IReadingsModel>("Reading", ReadingSchema);