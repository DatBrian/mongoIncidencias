import { Request, Response, NextFunction } from "express";

const catchedAsync = (fn:Function) => {
    return (req:Request, res:Response, next:NextFunction) => {
        fn(req, res).catch((err:Error) => next(err));
    };
};
export default catchedAsync;