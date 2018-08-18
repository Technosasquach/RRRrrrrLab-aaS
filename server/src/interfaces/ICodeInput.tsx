export interface ICodeInput {
    code: string,
    params?: {
        id: string,
        lang: string,
        deploymentTime: Date
    }
}