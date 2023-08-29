import { Response } from "express"

const response = (res: Response, statusCode: number, data: any) => {
    res.status(statusCode).json({
        error: false,
        data
    })
}
export default response;