import * as mongoose from "mongoose";

export interface INodeModel extends mongoose.Document {
    createdAt: Date;
    loc: {
        lat: number;
        long: number;
        address: string;
        location: string;
    };
    deviceID: string;
    simNumber: string;
}

export const NodeSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : { type: Date, default: Date.now },
    loc : {
        lat : Number, // GPS.Latitude
        long : Number, // GPS.Longitude
        address : String, // The actual adress of where the chip is located
        location : String, // The long text of various details on where is located
    },
    deviceID : String,
    simNumber : String
});

export const Node: mongoose.Model<INodeModel> = mongoose.model<INodeModel>("Nodes", NodeSchema);