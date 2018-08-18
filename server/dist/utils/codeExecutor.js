"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cprocess = require("child_process");
const fs = require("fs");
const childprocess_1 = require("./../config/childprocess");
class CodeExecutor {
    constructor(pathToFile, processUUID) {
        this.outPath = childprocess_1.childProcessSettings.pathToLogs +
            "/" + this.processUUID + childprocess_1.childProcessSettings.fileOutSuffix +
            childprocess_1.childProcessSettings.outputFileTypeLog;
        this.errPath = childprocess_1.childProcessSettings.pathToLogs +
            "/" + this.processUUID + childprocess_1.childProcessSettings.fileOutSuffix +
            childprocess_1.childProcessSettings.outputFileTypeLog;
        this.pathToFile = pathToFile;
        this.processUUID = processUUID;
        this.out = fs.openSync(this.outPath, "a");
        this.err = fs.openSync(this.errPath, "a");
    }
    ;
    exec() {
        return new Promise((resolve, reject) => {
            // this.err = fs.openSync('./out.log', 'a');
            const command = childprocess_1.childProcessSettings.pathToExecutableProcess;
            const args = ["-f", this.pathToFile];
            this.process = cprocess.spawn(command, args, {
                // Process spawn options
                stdio: ['ignore', this.out, this.err]
            });
            // Mount all the callbacks!
            // ------------------------
            this.process.stdout.on('data', (data) => {
                console.log("[Process " + this.processUUID + "] " + data);
            });
            this.process.on('close', (exitCode) => {
                if (exitCode !== 0) {
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
                    reject(exitCode);
            });
        });
    }
}
exports.CodeExecutor = CodeExecutor;
//# sourceMappingURL=codeExecutor.js.map