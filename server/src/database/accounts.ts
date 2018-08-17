// import * as mongoose from "mongoose";
// import * as bcrypt from "bcrypt-nodejs";

// export enum AccountLevels {
//     ADMIN           = 0,    // 0: Pure Admin
//     USER_GRAPHS     = 1,    // 1: Graphing
//     USER_SETTINGS   = 2,    // 2: Graphing and User facing settings
//     USER_TERMINAL   = 3     // 3: All of the above + terminal
// }

// export interface IExternalAccountModel extends mongoose.Document {
//     username: string;
//     createdAt: Date;
//     lvl: AccountLevels; // Contains the model and interaction to the enum, keeps the DB pure with simple types
//     deviceIDs: String[];
// }
// export interface IAccountModel extends IExternalAccountModel {
//     password: string;
//     generateHash(password: string): string;
//     validPassword(password: string): boolean;
// }

// export const AccountSchema: mongoose.Schema = new mongoose.Schema({
//     createdAt : { type: Date, default: Date.now },
//     username: String,
//     password: String,
//     lvl: Number,
//     deviceIDs: [String]
// }); // , { _id: false });

// // AccountSchema.plugin(AutoIncrement, {id: "accountID"});

// // Hashing password
// AccountSchema.methods.generateHash = function(password: string) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// // Checking if password is valid
// AccountSchema.methods.validPassword = function(password: string) {
//     return bcrypt.compareSync(password, this.password);
// };

// export const Account: mongoose.Model<IAccountModel> = mongoose.model<IAccountModel>("Account", AccountSchema);