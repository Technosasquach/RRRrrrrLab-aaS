
import { CodeExecutor } from "./codeExecutor";
import { CodeOutputExtractor } from "./codeOutputExtracting";
import { ICodeOutput } from "./ICodeOutput";

import * as fs from "fs";

export class CodeRunner {

    // Gets a command to run a file
    // Handles function creation and 

    // Take a complex string and run it
    static function execFunction(code: string): ICodeOutput {
        // Save file
        const pathToFileName = fs.writeFileSync();
        // Execute on file
        this.execFileFunction(pathToFileName);
    };

    // Take a file and run it, and return a ICodeOutput object
    static function execFileFunction(pathTofileName: string): ICodeOutput {
        const output: ICodeOutput = new CodeExecutor(pathTofileName, ).exec();
    };

    private function finishFunction() {

    }

    static function saveFunction() {

    };

}