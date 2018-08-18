"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CodeOutputExtractor {
    static parseOutput() {
        return new Promise((resolve, reject) => {
            // resolve(output);
            // reject(exitCode);
        });
    }
    /**
     * extractContent
     *
     * Looks for the appropriate match in regex
     * then will return the next element found after
     * the following space, till the next space
     *
     * @param regex {string} Given string to look for
     */
    static extractContent(lookUp) {
        const reg = new RegExp('\\w+');
        return "";
    }
}
exports.CodeOutputExtractor = CodeOutputExtractor;
//# sourceMappingURL=codeOutputExtracting.js.map