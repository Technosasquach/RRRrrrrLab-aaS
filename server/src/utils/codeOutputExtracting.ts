import { ICodeOutput } from "./ICodeOutput";
import { codeOutputs, programTested, programTestable, programOutputTypes } from "./../config/codeOutput";
import * as fs from "fs";
import { Io } from "./../core";

export class CodeOutputExtractor {

    public static parseOutput(pathToFile: string, uuid: string) {
        return new Promise((resolve: Function, reject: Function) => {
            const output: ICodeOutput = {};
            // Run for each line
            fs.readFile(pathToFile, (err: Error, data: Buffer) => {
                if(err) reject("Failed to read given file");
                const linesAll: string = data.toString();
                console.log("[ParseOutput] Input: " + data);
                const lines: string[] = linesAll.split("\n");
                console.log("[ParseOutput] Number of lines: " + lines.length);
                lines.forEach((line: string, index: number) => {
                    if(line) console.log("[ParseOutput] Analysing Line: " + line);
                    this.extractContentFromLine(line, uuid).forEach((data: programTested) => {
                        if (data.type == programOutputTypes.GRAPH) {
                            if (!output.graphical) output.graphical = [];
                            output.graphical.push(data.val);
                        }
                        if (data.type == programOutputTypes.NUMBER || data.type == programOutputTypes.NUMBERS) {
                            if (!output.numerical) output.numerical = [];
                            output.numerical.push(data.val);
                        }
                        if (data.type == programOutputTypes.TEXT) {
                            if (!output.lexical) output.lexical = [];
                            output.lexical.push(data.val);
                        }
                    });
                });
                // console.log("Output -----> : " + JSON.stringify(output));
                Io.emit('broadcast',{ msg: "[Process " + uuid + "] Final Object: " + JSON.stringify(output) });
                resolve(output);
            });
        });
    }

    private static extractContentFromLine(lookUp: string, uuid: string): programTested[] {
        // Test against all know types of things
        let foundTypes: programTested[] = []
        codeOutputs.forEach((testable: programTestable) => {
            // const foundText = lookUp.match(testable.regex);
            const reg = RegExp(testable.regex,testable.flags);
            const foundText = reg.exec(lookUp);
            if(foundText != null) {
                
                if(foundText.length > 0) {
                    // Will have found a match
                    console.log("[ParseOutput] Found Match: " + testable.type + " | " + foundText[1]);
                    Io.emit('broadcast',{ msg: "[Process " + uuid + "] Parser - Analysed Line: " + lookUp + " | Found: " + testable.type + " : " + foundText[1] });
                    foundTypes.push({
                        type: testable.type,
                        val: foundText[1]
                    })
                }
            }
        })
        return foundTypes;
    }
}