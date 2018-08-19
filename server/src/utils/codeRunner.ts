
import { CodeExecutor } from "./codeExecutor";
import { CodeOutputExtractor } from "./codeOutputExtracting";
import { ICodeOutput, CodeProcess } from "./ICodeOutput";
import { childProcessSettings } from "./../config/childprocess";

import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { v1 } from "uuid";

export class CodeRunner {

    // Gets a command to run a file
    // Handles function creation and 

    // Take a complex string and run it
    public static execFunction(code: string): Promise<ICodeOutput> {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                // Save file
                const processUUID = v1();
                const pathToFileName = childProcessSettings.pathToRawCode + "/" + processUUID + childProcessSettings.outputFileTypeRLab;
                mkdirp(path.dirname(pathToFileName), (err: any) => {
                    if (err) console.log(JSON.stringify(err));
                    fs.writeFileSync(pathToFileName, code)
                });
                
                // Execute on file
                this.execFileFunction(pathToFileName, processUUID).then(
                    (result: ICodeOutput) => { resolve(result); },
                    (err:    ICodeOutput) => { reject(err);     }
                );
            } catch {
                reject({ err: { type: "Whole exec failure", raw: "Something seriously broke (execFunction)" }})
            }
        });
    }

    // Take a file and run it, and return a ICodeOutput object
    public static execFileFunction(pathTofileName: string, processUUID?: string): Promise<ICodeOutput> {
        return new Promise((resolve: Function, reject: Function) => {
            try{
                const uuid = processUUID || v1();
                new CodeExecutor(pathTofileName, uuid).exec().then(
                    (result: CodeProcess) => {
                        CodeOutputExtractor.parseOutput(result.outPath, uuid).then(
                            (result: ICodeOutput) => { resolve(result); }, 
                            (err:    ICodeOutput) => { resolve(
                                { err: { type: "Output Processor", raw: err }});
                            }
                        )
                        return { err: { type: "Output Processor", raw: "Exited with no further code execution" }};
                    }, 
                    (err: ICodeOutput) => { resolve(err); }
                );
            } catch {
                reject({ err: { type: "Whole exec failure", raw: "Something seriously broke (execFileFunction)" }})
            }
        });
    };

}