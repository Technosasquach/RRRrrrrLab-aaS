"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeExecutor_1 = require("./codeExecutor");
const codeOutputExtracting_1 = require("./codeOutputExtracting");
const childprocess_1 = require("./../config/childprocess");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const uuid_1 = require("uuid");
class CodeRunner {
    // Gets a command to run a file
    // Handles function creation and 
    // Take a complex string and run it
    static execFunction(code) {
        return new Promise((resolve, reject) => {
            try {
                // Save file
                const processUUID = uuid_1.v1();
                const pathToFileName = childprocess_1.childProcessSettings.pathToRawCode + "/" + processUUID + childprocess_1.childProcessSettings.outputFileTypeRLab;
                mkdirp(path.dirname(pathToFileName), (err) => {
                    if (err)
                        console.log(JSON.stringify(err));
                    fs.writeFileSync(pathToFileName, code);
                });
                // Execute on file
                this.execFileFunction(pathToFileName, processUUID).then((result) => { resolve(result); }, (err) => { reject(err); });
            }
            catch (_a) {
                reject({ err: { type: "Whole exec failure", raw: "Something seriously broke (execFunction)" } });
            }
        });
    }
    // Take a file and run it, and return a ICodeOutput object
    static execFileFunction(pathTofileName, processUUID) {
        return new Promise((resolve, reject) => {
            try {
                const uuid = processUUID || uuid_1.v1();
                new codeExecutor_1.CodeExecutor(pathTofileName, uuid).exec().then((result) => {
                    codeOutputExtracting_1.CodeOutputExtractor.parseOutput(result.outPath, uuid).then((result) => { resolve(result); }, (err) => {
                        resolve({ err: { type: "Output Processor", raw: err } });
                    });
                    return { err: { type: "Output Processor", raw: "Exited with no further code execution" } };
                }, (err) => { resolve(err); });
            }
            catch (_a) {
                reject({ err: { type: "Whole exec failure", raw: "Something seriously broke (execFileFunction)" } });
            }
        });
    }
    ;
}
exports.CodeRunner = CodeRunner;
//# sourceMappingURL=codeRunner.js.map