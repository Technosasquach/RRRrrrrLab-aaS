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
        regex: /{{text:(.*?)}}/gm
    },
    {
        type: programOutputTypes.GRAPH,
        regex: /{{graph:(.*?)}}/gm
    },
];
//# sourceMappingURL=codeOutput.js.map