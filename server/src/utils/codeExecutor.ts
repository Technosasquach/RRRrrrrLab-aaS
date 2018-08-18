
import * as cprocess from "child_process";
import { v1 } from "uuid"
import * as path from "path";
import * as fs from "fs";
import { childProcessSettings } from "./../config/childprocess";

export class CodeExecutor {

    // When constructed, will start up the process and do all of the appropiate bindings
    // Will then hook callbacks for all elements

    public processUUID: string = v1();
    private pathToFile: string;
    private finishCallback: Function;
    private process: cprocess.ChildProcess;
    private out: any;
    private err: any;

    constructor(pathToFile: string, callback: Function) {
        this.pathToFile = pathToFile;
        this.finishCallback = callback;
        this.out = fs.openSync(
            childProcessSettings.pathToLogs + "/" + this.processUUID + childProcessSettings.outputFileType
            , "a"
        );
    };

    public exec() {
        // this.err = fs.openSync('./out.log', 'a');
        this.process = cprocess.spawn(
            // Process
            childProcessSettings.pathToExecuteableProcess,
            // Args
            ["-f", this.pathToFile],
            {
                // Process spawn options
                stdio: [ 'ignore', this.out, 'ignore' ]
            }
        );

        // Mount all the callbacks!
        // ------------------------

        this.process.stdout.on('data', (data: string|Buffer) => {
            console.log("[Process " + this.processUUID + "] " + data);
        });

        this.process.on('close', (code) => {
            if (code !== 0) {
                this.finishCallback(this.processUUID, );
                // console.log(`grep process exited with code ${code}`);
            }
        });
    }
}