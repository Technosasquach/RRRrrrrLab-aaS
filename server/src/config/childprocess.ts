import * as path from 'path';

export const childProcessSettings = {
    //pathToRootProcesses: "./../../../lib",
    //pathToRootProcesses: path.join(process.argv[1], "../"),
    pathToExecutableProcess: "java",
    pathToStore: path.join(process.argv[1], "../../../storage"),
    pathToLogs: path.join(process.argv[1], "../../../storage/output"),
    pathToRawCode: path.join(process.argv[1], "../../../storage/raw"),
    pathToPyCode: path.join(process.argv[1], "../../../storage/py"),
    fileOutSuffix: "-log",
    fileErrSuffix: "-err",
    outputFileTypeLog: ".rumlog",
    outputFileTypeRLab: ".rum"
}
