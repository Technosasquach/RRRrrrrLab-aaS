export enum programOutputTypes {
    NUMBER = "NUMBER",
    NUMBERS = "NUMBERS",
    GRAPH = "GRAPH",
    TEXT = "TEXT"
}

export interface programTestable {
    type: programOutputTypes,
    regex: string,
    flags: string
}

export interface programTested {
    type: programOutputTypes,
    val: string
}

export const codeOutputs: programTestable[] = [
    {
        type: programOutputTypes.TEXT,
        regex: "<<<text:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.GRAPH,
        regex: "<<<graph:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.NUMBER,
        regex: "<<<number:(.*?)>>>",
        flags: "gm"
    },
    {
        type: programOutputTypes.NUMBERS,
        regex: "<<<numbers:(.*?)>>>",
        flags: "gm"
    },
]