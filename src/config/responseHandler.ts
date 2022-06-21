import express, {NextFunction} from "express";
import { ValidateError } from "tsoa";

export class ResponseHandler {

    public errorHandlerValidation(
        err: unknown,
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ): express.Response | void {
        if ( err instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
            return res.status(422).json({
                message: "Validation Error",
                details: err?.fields,
            })
        }
        if (err instanceof Error) {
            return res.status(500).json({
                message : "Internal Server Error"
            });
        }
        next();
    }

    public notFoundHandler (req: any, res: express.Response) {
        res.status(404).send({
            message : "Request Not Found",
        });
    }
}