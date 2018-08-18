"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeExecutor_1 = require("./codeExecutor");
const childprocess_1 = require("./../config/childprocess");
const fs = require("fs");
const uuid_1 = require("uuid");
class CodeRunner {
    // Gets a command to run a file
    // Handles function creation and 
    // Take a complex string and run it
    static execFunction(code) {
        // Save file
        const processUUID = uuid_1.v1();
        const pathToFileName = childprocess_1.childProcessSettings.pathToRawCode + "/" + processUUID + childprocess_1.childProcessSettings.outputFileTypeRLab;
        fs.writeFileSync(pathToFileName, code);
        // Execute on file
        return this.execFileFunction(pathToFileName, processUUID);
    }
    ;
    // Take a file and run it, and return a ICodeOutput object
    static execFileFunction(pathTofileName, processUUID) {
        const uuid = processUUID || uuid_1.v1();
        new codeExecutor_1.CodeExecutor(pathTofileName, uuid).exec().then((result) => {
            return {};
        }, (err) => {
            return { err: { type: "Process Failed", raw: "Error code: " + err } };
        });
    }
    ;
}
exports.CodeRunner = CodeRunner;
//# sourceMappingURL=codeRunner.js.map