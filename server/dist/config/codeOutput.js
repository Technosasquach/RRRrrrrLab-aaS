"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var programOutputTypes;
(function (programOutputTypes) {
    programOutputTypes["NUMBER"] = "NUMBER";
    programOutputTypes["NUMBERS"] = "NUMBERS";
    programOutputTypes["GRAPH"] = "GRAPH";
    programOutputTypes["TEXT"] = "TEXT";
})(programOutputTypes = exports.programOutputTypes || (exports.programOutputTypes = {}));
exports.codeOutputs = [
    {
        type: programOutputTypes.TEXT,
        regex: "<<<text:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.GRAPH,
        regex: "<<<graph:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.NUMBER,
        regex: "<<<number:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.NUMBERS,
        regex: "<<<numbers:(.*?)>>>",
        flags: "gm"
    },
];
//# sourceMappingURL=codeOutput.js.map