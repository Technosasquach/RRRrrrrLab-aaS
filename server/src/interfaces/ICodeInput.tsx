export interface ICodeInput {
    params?: {
        id: string,
        lang: string,
        deploymentTime: Date
    }
}

export interface ICodeInputText extends ICodeInput {
    code: string;
}

export interface ICodeInputFile extends ICodeInput {
    filePath: string;
}