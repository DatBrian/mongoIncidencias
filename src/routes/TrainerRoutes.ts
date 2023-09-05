import { Router } from "express";
import { TrainersController } from "../api/v1";
import routesVersioning from "express-routes-versioning";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware";
import { TrainerDTO } from "../models/dto/TrainerDTO";
import TrainerSchema from "../models/schemas/TrainerSchema";

class TrainersRoutes {
    public readonly path: string;
    public router: Router;
    private readonly controller: TrainersController;
    private version: any;

    constructor() {
        this.path = "/trainer";
        this.router = Router();
        this.controller = new TrainersController();
        this.version = routesVersioning();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(
            `/all`,
            this.version({
                "1.0.0": this.controller.getAll,
            })
        );
        this.router.get(`/id/:id?`, (req, res, next) => {
            this.version({
                "1.0.0": this.controller.getById(req, res, next),
            });
        });
        this.router.post(
            `/insert`,
            new ValidateDTOMiddleware(
                TrainerDTO,
                TrainerSchema.properties()
            ).validate(),
            (req, res, next) => {
                this.version({
                    "1.0.0": this.controller.insertOne(req, res, next),
                });
            }
        );
        this.router.put(
            `/update`,
            new ValidateDTOMiddleware(
                TrainerDTO,
                TrainerSchema.properties()
            ).validate(),
            (req, res, next) => {
                this.version({
                    "1.0.0": this.controller.updateOne(req, res, next),
                });
            }
        );
        this.router.delete(`/delete`, (req, res, next) => {
            this.version({
                "1.0.0": this.controller.deleteOne(req, res, next),
            });
        });
    }
}
export default TrainersRoutes;
