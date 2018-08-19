
//this is really dumb
export class CodeSanitizer {

    public static sanitize(code: string): string{
        let codeProto = code;

        codeProto.replace(".exe", "JUNKSTRING");
        codeProto.replace("SELECT", "JUNKSTRING");
        codeProto.replace("DELETE", "JUNKSTRING");

        return (codeProto == code) ? codeProto : "";
    }

}