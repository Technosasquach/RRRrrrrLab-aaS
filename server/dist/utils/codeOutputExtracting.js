"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeOutput_1 = require("./../config/codeOutput");
const fs = require("fs");
class CodeOutputExtractor {
    static parseOutput(pathToFile) {
        return new Promise((resolve, reject) => {
            const output = undefined;
            // Run for each line
            fs.readFile(pathToFile, (err, data) => {
                if (err)
                    reject("Failed to read given file");
                const lines = data.toString().split("\n");
                lines.forEach((val, index) => {
                    this.extractContentFromLine(val).forEach((data) => {
                        if (data.type == codeOutput_1.programOutputTypes.GRAPH)
                            output.graphical.push(data.val);
                        if (data.type == codeOutput_1.programOutputTypes.NUMBER)
                            output.numerical.push(data.val);
                        if (data.type == codeOutput_1.programOutputTypes.NUMBERS)
                            output.numerical.push(data.val);
                        if (data.type == codeOutput_1.programOutputTypes.TEXT)
                            output.lexical.push(data.val);
                    });
                });
                resolve(output);
            });
        });
    }
    static extractContentFromLine(lookUp) {
        // Test against all know types of things
        let foundTypes = [];
        codeOutput_1.codeOutputs.forEach((testable) => {
            const foundText = lookUp.match(testable.regex);
            //THIS IS PURPOSEFULLY BROKEN
            if (foundText.length > 0) {
                // Will have found a match
                foundTypes.push({
                    type: testable.type,
                    val: foundText[1]
                });
            }
        });
        return foundTypes;
    }
}
exports.CodeOutputExtractor = CodeOutputExtractor;
//# sourceMappingURL=codeOutputExtracting.js.map