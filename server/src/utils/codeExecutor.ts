
import * as cprocess from "child_process";
import * as path from "path";
import * as fs from "fs";
import { childProcessSettings } from "./../config/childprocess";
import { CodeProcess } from "./ICodeOutput";

import * as mkdirp from "mkdirp";
export class CodeExecutor {

    // When constructed, will start up the process and do all of the appropiate bindings
    // Will then hook callbacks for all elements

    public processUUID: string;
    private pathToFile: string;
    private finishCallback: Function;
    private process: cprocess.ChildProcess;
    private outPath: string = 
        childProcessSettings.pathToLogs +
        "/" + this.processUUID + childProcessSettings.fileOutSuffix +
        childProcessSettings.outputFileTypeLog;
    private errPath: string = 
        childProcessSettings.pathToLogs +
        "/" + this.processUUID + childProcessSettings.fileOutSuffix +
        childProcessSettings.outputFileTypeLog;
    private out: any;
    private err: any;

    constructor(pathToFile: string, processUUID: string) {
        this.pathToFile = pathToFile;
        this.processUUID = processUUID;
        mkdirp(path.dirname(this.outPath), (err) => {
            if (err) console.log(err);
            this.out = fs.openSync(this.outPath, "a");
            this.err = fs.openSync(this.errPath, "a");
        });

    };

    public exec() {
        return new Promise((resolve: Function, reject: Function) => {
        // this.err = fs.openSync('./out.log', 'a');
            const command: string = childProcessSettings.pathToExecutableProcess
            const args: string[] = [this.pathToFile];
            this.process = cprocess.spawn(
                command,
                args,
                {
                    // Process spawn options
                    stdio: [ 'ignore', this.out, this.err ]
                }
            );

            // Mount all the callbacks!
            // ------------------------

            this.process.stdout.on('data', (data: string|Buffer) => {
                console.log("[Process " + this.processUUID + "] " + data);
            });

            this.process.on('close', (exitCode) => {
                if (exitCode !== 0) {
                    const output: CodeProcess = {
                        uuid: this.processUUID,
                        command,
                        args,
                        outPath: this.outPath,
                        errPath: this.errPath,
                        exitCode
                    }
                    resolve(output);
                } else reject({
                    err: { 
                        type: "Code Execution", 
                        raw: `Error code: ${exitCode}`
                    }
                });
            });
        });
    }
}