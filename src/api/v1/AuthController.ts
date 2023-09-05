import Connection from "../../db/Connection";
import UserSchema from "../../models/schemas/UserSchema";
import ClientError from "../../utils/ClientError";

class AuthController extends Connection {
    constructor() {
        super();
    }

    async findUser(req:any, res:any) {
        try {
            if (!req.rateLimit) return;
            res.status(req.data.status).send(req.data);
        } catch (error:any) {
            new ClientError("Error al obtener los Auth Controlador", 400);
            throw error.message;
        }
    }

    async createUser(req:any, res:any) {
        try {
            await this.connect();
            const exist = await UserSchema.findUser(req.body.user);
            const response =
                exist === false
                    ? await UserSchema.createUser(req.body)
                    : `El usuario con username: ${req.body.user} ya existe`;
            res.json(response);
        } catch (error) {
            throw error;
        } finally {
            this.close();
        }
    }
}
export default AuthController;
