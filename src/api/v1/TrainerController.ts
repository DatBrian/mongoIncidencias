import { TrainersService } from "../../services";
import { catchedAsync } from "../../utils";
import { Request, Response } from "express";

class TrainersController {
    private readonly service: TrainersService;

    constructor() {
        this.service = new TrainersService();
    }

    public getAll = catchedAsync(async (_req: Request, res: Response) => {
        const response = await this.service.getAll();
        res.json(response);
    });

    public getById = catchedAsync(async (req: Request, res: Response) => {
        const id = req.query.id;
        const response = await this.service.getById(id);
        res.json(response);
    });

    public insertOne = catchedAsync(async (req: Request, res: Response) => {
        const body = req.body;
        const response = await this.service.insertOne(body);
        res.json(response);
    });

    public updateOne = catchedAsync(async (req: Request, res: Response) => {
        const id = req.query.id;
        const body = req.body;
        const response = await this.service.updateOne(id, body);
        res.json(response)
    });

    public deleteOne = catchedAsync(async (req: Request, res: Response) => {
        const id = req.query.id;
        const response = await this.service.deleteOne(id);
        res.json(response)
    });
}
export default TrainersController;
