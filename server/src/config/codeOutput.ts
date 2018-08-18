export enum programOutputTypes {
    NUMBER = "NUMBER",
    NUMBERS = "NUMBERS",
    GRAPH = "GRAPH",
    TEXT = "TEXT"
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
        type: programOutputTypes.TEXT,
        regex: /{{text:(.*?)}}/gm
    },
    {
        type: programOutputTypes.GRAPH,
        regex: /{{graph:(.*?)}}/gm
    },
]