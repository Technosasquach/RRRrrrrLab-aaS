"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cprocess = require("child_process");
const path = require("path");
const fs = require("fs");
const childprocess_1 = require("./../config/childprocess");
const mkdirp = require("mkdirp");
class CodeExecutor {
    constructor(pathToFile, processUUID) {
        this.pathToFile = pathToFile;
        this.processUUID = processUUID;
        this.outPath = childprocess_1.childProcessSettings.pathToLogs +
            "/" + this.processUUID + childprocess_1.childProcessSettings.fileOutSuffix +
            childprocess_1.childProcessSettings.outputFileTypeLog;
        this.errPath = childprocess_1.childProcessSettings.pathToLogs +
            "/" + this.processUUID + childprocess_1.childProcessSettings.fileOutSuffix +
            childprocess_1.childProcessSettings.outputFileTypeLog;
        mkdirp(path.dirname(this.outPath), (err) => {
            if (err)
                console.log(JSON.stringify(err));
            fs.open(this.outPath, "a", (err, fd) => {
                if (err)
                    console.log(JSON.stringify(err));
                this.out = fd;
            });
        });
        mkdirp(path.dirname(this.errPath), (err) => {
            if (err)
                console.log(JSON.stringify(err));
            fs.open(this.errPath, "a", (err, fd) => {
                this.err = fd;
            });
        });
        // this.writeStream = fs.createWriteStream(this.out);
        // this.writeStream.write.bind(this.writeStream);
    }
    ;
    exec() {
        return new Promise((resolve, reject) => {
            // this.err = fs.openSync('./out.log', 'a');
            const command = childprocess_1.childProcessSettings.pathToExecutableProcess;
            const args = [this.pathToFile];
            this.process = cprocess.spawn(command, args, {
                // Process spawn options
                stdio: ['ignore', this.out, this.err]
                //stdio: [ 'ignore', this.writeStream, this.writeStream ]
            });
            // Mount all the callbacks!
            // ------------------------
            this.process.stdout.on('data', (data) => {
                console.log("[Process " + this.processUUID + "] " + data);
            });
            this.process.on('close', (exitCode) => {
                console.log("[Process " + this.processUUID + "] EXIT code: " + exitCodes[exitCode]);
                if (exitCode == 0) {
                    const output = {
                        uuid: this.processUUID,
                        command,
                        args,
                        outPath: this.outPath,
                        errPath: this.errPath,
                        exitCode
                    };
                    resolve(output);
                }
                else
                    reject({
                        err: {
                            type: "Code Execution",
                            raw: `Error code: ${exitCodes[exitCode]}`
                        }
                    });
            });
        });
    }
}
exports.CodeExecutor = CodeExecutor;
const exitCodes = [
    "0 - Success",
    "1 - Uncaught Fatal Exception",
    "2 - UNUSED ERROR CODE",
    "3 - Internal JavaScript Parse Error",
    "4 - Internal JavaScript Evaluation Failure",
    "5 - Fatal Error",
    "6 - Non-function Internal Exception Handler",
    "7 - Internal Exception Handler Run-Time Failure",
    "8 - UNUSED ERROR CODE",
    "9 - Invalid Argument",
    "10 - Internal JavaScript Run-Time Failure",
    "11 - Invalid Debug Argument",
    "12 to 127 - Signal Exits"
];
//# sourceMappingURL=codeExecutor.js.map