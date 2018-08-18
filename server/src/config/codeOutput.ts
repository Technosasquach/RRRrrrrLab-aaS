export enum programOutputTypes {
    NUMBER = "NUMBER",
    NUMBERS = "NUMBERS",
    GRAPH = "GRAPH",
}

export interface programTestable {
    type: programOutputTypes,
    regex: RegExp|string,
}

export interface programTested {
    type: programOutputTypes,
    val: string
}

export const codeOutputs: programTestable[] = [
    {
        type: programOutputTypes.NUMBER,
        regex: /^<<<OUTPUT:NUMBER>>> (.*?) .*$/gm
    },
    {
        type: programOutputTypes.NUMBERS,
        regex: /^<<<OUTPUT:NUMBERS>>> (.*?) .*$/gm
    },
    {
        type: programOutputTypes.GRAPH,
        regex: /^<<<OUTPUT:GRAPH>>> (.*?) .*$/gm
    },
]