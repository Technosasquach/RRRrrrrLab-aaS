"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cprocess = require("child_process");
const path = require("path");
const fs = require("fs");
const childprocess_1 = require("./../config/childprocess");
const core_1 = require("./../core");
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
            this.outFd = fs.openSync(this.outPath, "a");
        });
        mkdirp(path.dirname(this.errPath), (err) => {
            if (err)
                console.log(JSON.stringify(err));
            this.errFd = fs.openSync(this.errPath, "a");
        });
    }
    ;
    exec() {
        return new Promise((resolve, reject) => {
            const command = childprocess_1.childProcessSettings.pathToExecutableProcess;
            const args = [
                "-jar",
                "./rum_app.jar",
                this.processUUID,
                this.pathToFile,
                childprocess_1.childProcessSettings.pathToPyCode + "/" + this.processUUID + ".py"
            ];
            console.log("[Process " + this.processUUID + "] Starting Process");
            core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] Starting Process" });
            this.process = cprocess.spawn(command, args, 
            // [],
            {
                // Process spawn options
                stdio: ['ignore', 'pipe', 'pipe']
                // stdio: [ 'ignore', this.out, this.err ]
                // stdio: [ 'ignore', this.writeStream, this.writeStream ]
            });
            this.process.stdout.on('data', (data) => {
                console.log("[Process " + this.processUUID + "] STDOUT: " + data);
                core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] STDOUT: " + data });
                fs.write(this.outFd, data.toString(), (err, written, str) => {
                    if (err)
                        console.log("[Process " + this.processUUID + "] ERROR STDOUT: " + err);
                    core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] ERROR STDOUT: " + err });
                });
            });
            this.process.stderr.on('data', (data) => {
                console.log("[Process " + this.processUUID + "] STDERR: " + data);
                core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] STDERR: " + data });
                fs.write(this.errFd, data.toString(), (err, written, str) => {
                    if (err && err != null) {
                        console.log("[Process " + this.processUUID + "] ERROR STDERR: " + err);
                        core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] ERROR STDERR: " + err });
                    }
                });
            });
            this.process.on('close', (exitCode) => {
                fs.close(this.outFd, (err) => {
                    if (err)
                        console.log("[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD");
                    // Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD" });
                });
                fs.close(this.errFd, (err) => {
                    if (err)
                        console.log("[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD");
                    // Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD" });
                });
                console.log("[Process " + this.processUUID + "] EXIT code: " + exitCodes[exitCode]);
                core_1.Io.emit('broadcast', { msg: "[Process " + this.processUUID + "] EXIT code: " + exitCodes[exitCode] });
                if (exitCode == 0) {
                    const output = {
                        uuid: this.processUUID,
                        command,
                        args,
                        outPath: this.outPath,
                        errPath: this.errPath,
                        exitCode
                    };
                    console.log("[Process " + this.processUUID + "] EXIT Object: " + JSON.stringify(output));
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