import { Router } from "express";
import { IncidenciaController } from "../api/v1";
import routesVersioning from "express-routes-versioning";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware";
import IncidenciaSchema from "../models/schemas/IncidenciaSchema";
import { IncidenciaDTO } from "../models/dto/IncidenciaDTO";
import { limitUsuario } from "../helpers/limit";
import passPortHelper from "../helpers/passPortHelper"

class IncidenciaRoutes {
    public readonly path: string;
    public router: Router;
    private readonly controller: IncidenciaController;
    private version: any;

    constructor() {
        this.path = "/incidencia";
        this.router = Router();
        this.controller = new IncidenciaController();
        this.version = routesVersioning();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use(
            limitUsuario(),
            passPortHelper.authenticate("bearer", {
                session: false,
            })
        );
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
                IncidenciaDTO,
                IncidenciaSchema.properties()
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
                IncidenciaDTO,
                IncidenciaSchema.properties()
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
export default IncidenciaRoutes;
