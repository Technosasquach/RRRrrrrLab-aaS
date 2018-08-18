
export interface CodeProcess {
    uuid: string,
    command: string,
    args: string|string[],
    outPath: string,
    errPath: string,
    exitCode: string|number
}
export interface ICodeOutput {
    err?: {
        type: string,
        raw: string
    },
}