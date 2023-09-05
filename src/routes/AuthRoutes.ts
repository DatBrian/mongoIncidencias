import { Router } from "express";
import { AuthController } from "../api/v1";
import routesVersioning from "express-routes-versioning";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware";
import { limitLogin } from "../helpers/limit";
import { RegisterDTO } from "../models/dto/RegisterDTO";
import UserSchema from "../models/schemas/UserSchema";
import { crearToken } from "../helpers/JWT";
import { UserDTO } from "../models/dto/UserDTO";

class AuthRoutes {
    public readonly path: string;
    public router: Router;
    private readonly controller: AuthController;
    private version: any;

    constructor() {
        this.path = "/Auth";
        this.router = Router();
        this.controller = new AuthController();
        this.version = routesVersioning();
        this.initRoutes();
    }

    async initRoutes() {
        this.router.post(
            `/signin`,
            limitLogin(),
            new ValidateDTOMiddleware(
                RegisterDTO,
                UserSchema.registerProperties()
            ).validate(),
            crearToken,
            (req, res) => {
                this.version({
                    "1.0.0": this.controller.findUser(req, res),
                });
            }
        );
        this.router.post(
            `/signup`,
            new ValidateDTOMiddleware(
                UserDTO,
                UserSchema.properties()
            ).validate(),
            (req, res) => {
                this.version({
                    "1.0.0": this.controller.createUser(req, res),
                });
            }
        );
    }
}
export default AuthRoutes;
