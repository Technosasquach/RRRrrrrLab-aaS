
import * as cprocess from "child_process";
import * as path from "path";
import * as fs from "fs";
import { childProcessSettings } from "./../config/childprocess";
import { CodeProcess } from "./ICodeOutput";
import { Io } from "./../core";

import * as mkdirp from "mkdirp";
export class CodeExecutor {

    // When constructed, will start up the process and do all of the appropiate bindings
    // Will then hook callbacks for all elements

    public processUUID: string;
    private pathToFile: string;
    private process: cprocess.ChildProcess;
    private outPath: string;
    private errPath: string;
    private outFd: number;
    private errFd: number;

    constructor(pathToFile: string, processUUID: string) {

        this.pathToFile = pathToFile;
        this.processUUID = processUUID;

        this.outPath = childProcessSettings.pathToLogs +
            "/" + this.processUUID + childProcessSettings.fileOutSuffix +
            childProcessSettings.outputFileTypeLog;

        this.errPath = childProcessSettings.pathToLogs +
            "/" + this.processUUID + childProcessSettings.fileOutSuffix +
            childProcessSettings.outputFileTypeLog;


        mkdirp(path.dirname(this.outPath), (err: any) => {
            if (err) console.log(JSON.stringify(err));
            this.outFd = fs.openSync(this.outPath, "a");
        });

        mkdirp(path.dirname(this.errPath), (err: any) => {
            if (err) console.log(JSON.stringify(err));
            this.errFd = fs.openSync(this.errPath, "a");
        });

    };

    public exec() {
        return new Promise((resolve: Function, reject: Function) => {
            const command: string = childProcessSettings.pathToExecutableProcess
            const args: string[] = [this.pathToFile];
            console.log("[Process " + this.processUUID + "] Starting Process");
            Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] Starting Process" });
            this.process = cprocess.spawn(
                command,
                args,
                {
                    // Process spawn options
                    stdio: ['ignore', 'pipe', 'pipe']
                    // stdio: [ 'ignore', this.out, this.err ]
                    //stdio: [ 'ignore', this.writeStream, this.writeStream ]
                }
            );

            this.process.stdout.on('data', (data: string|Buffer) => {
                console.log("[Process " + this.processUUID + "] STDOUT: " + data);
                Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] STDOUT: " + data });
                fs.write(this.outFd, data.toString(), (err: any, written: number, str: string) => {
                    if(err) console.log("[Process " + this.processUUID + "] ERROR STDOUT: " + err);
                    Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR STDOUT: " + err });
                });
            });

            this.process.stderr.on('data', (data: string|Buffer) => {
                console.log("[Process " + this.processUUID + "] STDERR: " + data);
                Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] STDERR: " + data });
                fs.write(this.errFd, data.toString(), (err: any, written: number, str: string) => {
                    if(err && err != null) {
                        console.log("[Process " + this.processUUID + "] ERROR STDERR: " + err);
                        Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR STDERR: " + err });
                    }
                });
            });

            this.process.on('close', (exitCode) => {
                fs.close(this.outFd, (err) => {
                    if(err) console.log("[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD");
                    // Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD" });
                });
                fs.close(this.errFd, (err) => {
                    if(err) console.log("[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD");
                    // Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] ERROR FILE: FAILED TO CLOSE this.OUTFD" });
                });
                console.log("[Process " + this.processUUID + "] EXIT code: " + exitCodes[exitCode]);
                Io.emit('broadcast',{ msg: "[Process " + this.processUUID + "] EXIT code: " + exitCodes[exitCode] });
                if (exitCode == 0) {
                    const output: CodeProcess = {
                        uuid: this.processUUID,
                        command,
                        args,
                        outPath: this.outPath,
                        errPath: this.errPath,
                        exitCode
                    }
                    console.log("[Process " + this.processUUID + "] EXIT Object: " + JSON.stringify(output));
                    resolve(output);
                } else reject({
                    err: { 
                        type: "Code Execution", 
                        raw: `Error code: ${exitCodes[exitCode]}`
                    }
                });
            });
        });
    }
}

const exitCodes: string[] = [
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
                            ]