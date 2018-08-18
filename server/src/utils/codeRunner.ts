
import { CodeExecutor } from "./codeExecutor";
import { CodeOutputExtractor } from "./codeOutputExtracting";
import { ICodeOutput, CodeProcess } from "./ICodeOutput";
import { childProcessSettings } from "./../config/childprocess";

import * as fs from "fs";
import { v1 } from "uuid";

export class CodeRunner {

    // Gets a command to run a file
    // Handles function creation and 

    // Take a complex string and run it
    public static execFunction(code: string): ICodeOutput {
        // Save file
        const processUUID = v1();
        const pathToFileName = childProcessSettings.pathToRawCode + "/" + processUUID + childProcessSettings.outputFileTypeRLab
        fs.writeFileSync(pathToFileName, code);
        // Execute on file
        return this.execFileFunction(pathToFileName, processUUID);
    };

    // Take a file and run it, and return a ICodeOutput object
    public static execFileFunction(pathTofileName: string, processUUID?: string): ICodeOutput|any {
        const uuid = processUUID || v1();
        new CodeExecutor(pathTofileName, uuid).exec().then(
            (result: CodeProcess) => {
                CodeOutputExtractor.parseOutput(result.outPath).then(
                    (result: ICodeOutput) => {

                    }, 
                    (err: ICodeOutput) => { 
                        return { err: { type: "Output Processor", raw: err }};
                    }
                )
            }, 
            (err: ICodeOutput) => { return err; }
        )
    };

}