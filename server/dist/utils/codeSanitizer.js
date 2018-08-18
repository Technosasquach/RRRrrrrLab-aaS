"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//this is really dumb
class CodeSanitizer {
    static sanitize(code) {
        let codeProto = code;
        codeProto.replace(".exe", "JUNKSTRING");
        codeProto.replace("SELECT", "JUNKSTRING");
        codeProto.replace("DELETE", "JUNKSTRING");
        return (codeProto == code) ? codeProto : "";
    }
}
exports.CodeSanitizer = CodeSanitizer;
//# sourceMappingURL=codeSanitizer.js.map