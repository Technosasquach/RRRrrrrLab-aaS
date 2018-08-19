"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.childProcessSettings = {
    //pathToRootProcesses: "./../../../lib",
    //pathToRootProcesses: path.join(process.argv[1], "../"),
    pathToExecutableProcess: "python",
    pathToStore: path.join(process.argv[1], "../../store"),
    pathToLogs: path.join(process.argv[1], "../../store/output"),
    pathToRawCode: path.join(process.argv[1], "../../store/raw"),
    fileOutSuffix: "-log",
    fileErrSuffix: "-err",
    outputFileTypeLog: ".rumlog",
    outputFileTypeRLab: ".py"
};
//# sourceMappingURL=childprocess.js.map