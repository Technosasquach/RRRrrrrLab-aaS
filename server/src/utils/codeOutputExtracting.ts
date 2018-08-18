import { ICodeOutput } from "./ICodeOutput";


export class CodeOutputExtractor {

    public static parseOutput() {
        return new Promise((resolve: Function, reject: Function) => {
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
    private static extractContent(lookUp: string): string {
        const reg = new RegExp('\\w+');
        return "";
    }
}