import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const limitLogin = (): any => {
    return rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 10,
        skip: (req: any, res: Response): any => {
            if (req.headers["content-length"] > 80) {
                res.status(413).send({
                    message:
                        "Intentos de Solicitud Alcanzado, Vuelva a intentarlo en una Hora",
                });
                return true;
            }
            return false;
        },
        message: (_req: Request, res: Response): void => {
            res.status(429).send({
                message: "Limite alcanzado",
            });
        },
    });
};

export const limitUsuario = (): any => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        message: (_req: Request, res: Response): void => {
            res.status(429).send({
                message: "Limite alcanzado",
            });
        },
    });
};
