

import { Request, Response, NextFunction, Express } from "express";
import { CodeRunner } from "../utils/codeRunner";
import { ICodeOutput } from "../utils/ICodeOutput";
import { ICodeInput, ICodeInputFile, ICodeInputText } from "../interfaces/ICodeInput";

export function mountAPIService(app: Express) {

// API Pages
// -------------------------------------------------------------

    app.post("/api/", function(req: Request, res: Response) {
        res.json({
            message: "The API service is alive.",
            time: Date.now()
        });
    });

    // Returns deny msg
    app.use("/api/deny", function(req: Request, res: Response) {
        res.json({
            message: "You do not have access/can not find this resource"
        });
    });

    // Returns deny msg plus what ever extra given
    app.use("/api/deny/:msg", function(req: Request, res: Response) {
        res.json({
            message: "You do not have access/can not find this resource",
            note: req.params.msg
        });
    });

    // Returns basic information on the account the user has
    app.get("/api/account", function(req: Request, res: Response) {
        // res.json({
        //     username: req.user.username,
        //     createdAt: req.user.createdAt || Date.now(),
        //     lvl: req.user.level || 999,
        //     deviceIDs: req.user.deviceIDs
        // });
    });

    // Returns basic information on the node id given
    app.get("/api/node/:id", function(req: Request, res: Response) {
        
    });

    app.post("/api/execText", (req: Request, res: Response) => {
        CodeRunner.execFunction(req.body.code)
            .then((output: ICodeOutput) => {
                res.json({
                    ...output,
                    date: Date.now()
                })
            })
            .catch((output: ICodeOutput) => {
                if(output) {
                    res.json({
                        ...output,
                        date: Date.now()
                    })
                } else {
                    res.json({
                        err: {
                            type: "execText API Error",
                            raw: "Major top level error in API"
                        },
                        date: Date.now()
                    })
                }
            })
    })

    app.post("/api/execFile", (req: Request, res: Response) => {
        CodeRunner.execFileFunction(req.body.codePath)
            .then((output: ICodeOutput) => {
                res.json({
                    ...output,
                    date: Date.now()
                })
            })
            .catch((output: ICodeOutput) => {
                if(output) {
                    res.json({
                        ...output,
                        date: Date.now()
                    })
                } else {
                    res.json({
                        err: {
                            type: "execFile API Error",
                            raw: "Major top level error in API"
                        },
                        date: Date.now()
                    })
                }
            })
    })

}