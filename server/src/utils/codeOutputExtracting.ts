import { ICodeOutput } from "./ICodeOutput";
import { codeOutputs, programOutput, programTested, programTestable, programOutputTypes } from "./../config/codeOutput";
import * as fs from "fs";

export class CodeOutputExtractor {

    public static parseOutput(pathToFile: string) {
        return new Promise((resolve: Function, reject: Function) => {
            const output: ICodeOutput = undefined;
            // Run for each line
            fs.readFile(pathToFile, (err: Error, data: Buffer) => {
                if(err) reject("Failed to read given file");
                const lines: string[] = data.toString().split("\n");
                lines.forEach((val: string, index: number) => {
                    this.extractContentFromLine(val).forEach((data: programTested) => {
                        if (data.type == programOutputTypes.GRAPH) output.graphical.push(data.val);
                        if (data.type == programOutputTypes.NUMBER) output.numerical.push(data.val);
                        if (data.type == programOutputTypes.NUMBERS) output.numerical.push(data.val);
                    });
                });
                resolve(output);
            });
        });
    }

    private static extractContentFromLine(lookUp: string): programTested[] {
        // Test against all know types of things
        let foundTypes: programTested[] = []
        codeOutputs.forEach((testable: programTestable) => {
            const foundText = lookUp.match(testable.regex);
            if(foundText.length > 0) {
                // Will have found a match
                foundTypes.push({
                    type: testable.type,
                    val: foundText[1]
                })
            }
        })
        return foundTypes;
    }
}