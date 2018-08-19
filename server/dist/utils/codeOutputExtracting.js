"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeOutput_1 = require("./../config/codeOutput");
const fs = require("fs");
const core_1 = require("./../core");
class CodeOutputExtractor {
    static parseOutput(pathToFile, uuid) {
        return new Promise((resolve, reject) => {
            const output = {};
            // Run for each line
            fs.readFile(pathToFile, (err, data) => {
                if (err)
                    reject("Failed to read given file");
                const linesAll = data.toString();
                console.log("[ParseOutput] Input: " + data);
                const lines = linesAll.split("\n");
                console.log("[ParseOutput] Number of lines: " + lines.length);
                lines.forEach((line, index) => {
                    if (line)
                        console.log("[ParseOutput] Analysing Line: " + line);
                    this.extractContentFromLine(line, uuid).forEach((data) => {
                        if (data.type == codeOutput_1.programOutputTypes.GRAPH) {
                            if (!output.graphical)
                                output.graphical = [];
                            output.graphical.push(data.val);
                        }
                        if (data.type == codeOutput_1.programOutputTypes.NUMBER || data.type == codeOutput_1.programOutputTypes.NUMBERS) {
                            if (!output.numerical)
                                output.numerical = [];
                            output.numerical.push(data.val);
                        }
                        if (data.type == codeOutput_1.programOutputTypes.TEXT) {
                            if (!output.lexical)
                                output.lexical = [];
                            output.lexical.push(data.val);
                        }
                    });
                });
                // console.log("Output -----> : " + JSON.stringify(output));
                core_1.Io.emit('broadcast', { msg: "[Process " + uuid + "] Final Object: " + JSON.stringify(output) });
                resolve(output);
            });
        });
    }
    static extractContentFromLine(lookUp, uuid) {
        // Test against all know types of things
        let foundTypes = [];
        codeOutput_1.codeOutputs.forEach((testable) => {
            // const foundText = lookUp.match(testable.regex);
            const reg = RegExp(testable.regex, testable.flags);
            const foundText = reg.exec(lookUp);
            if (foundText != null) {
                if (foundText.length > 0) {
                    // Will have found a match
                    console.log("[ParseOutput] Found Match: " + testable.type + " | " + foundText[1]);
                    core_1.Io.emit('broadcast', { msg: "[Process " + uuid + "] Parser - Analysed Line: " + lookUp + " | Found: " + testable.type + " : " + foundText[1] });
                    foundTypes.push({
                        type: testable.type,
                        val: foundText[1]
                    });
                }
            }
        });
        return foundTypes;
    }
}
exports.CodeOutputExtractor = CodeOutputExtractor;
//# sourceMappingURL=codeOutputExtracting.js.map