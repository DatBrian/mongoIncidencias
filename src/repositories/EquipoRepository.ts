import { ObjectId } from "mongodb";
import Connection from "../db/Connection";
import { ClientError } from "../utils";

class EquipoRepository {
    private connection: Connection;
    private entity: string;
    private alias: any;
    constructor() {
        this.connection = new Connection();
        this.entity = "equipo";
        this.alias = {
            _id: 0,
            id: "$_id",
            screen: "$pantalla",
            screen_brand: "$pantalla.marca",
            screen_color: "$pantalla.color",
            screen_state: "$pantalla.estado",
            CPU: "$torre",
            CPU_brand: "$torre.marca",
            CPU_color: "$torre.color",
            CPU_state: "$torre.estado",
            keyboard: "$teclado",
            keyboard_brand: "$teclado.marca",
            keyboard_color: "$teclado.color",
            keyboard_state: "$teclado.estado",
            raton: "$mouse",
            raton_brand: "$mouse.marca",
            raton_color: "$mouse.color",
            raton_state: "$mouse.estado",
            headset: "$diadema",
            headset_brand: "$diadema.marca",
            headset_color: "$diadema.color",
            headset_state: "$diadema.estado",
            nombre_salon: "$salon",
        };
    }

    public async getAll() {
        try {
            console.log("repo");

            await this.connection.connect();
            return await this.connection
                .getDatabase()
                .collection(this.entity)
                .aggregate([
                    {
                        $project: this.alias,
                    },
                ])
                .toArray();
        } catch (error: any) {
            new ClientError(`Error en el repositorio de ${this.entity}`, 400);
            throw error.message;
        } finally {
            this.connection.close();
        }
    }

    public async getById(id: ObjectId) {
        try {
            await this.connection.connect();
            const result = await this.connection
                .getDatabase()
                .collection(this.entity)
                .aggregate([
                    {
                        $match: { _id: id },
                    },
                    {
                        $project: this.alias,
                    },
                ])
                .toArray();

            if (result.length === 0) {
                throw new ClientError(
                    `No se encontró ${this.entity} con id ${id}`,
                    400
                );
            }

            return result[0];
        } catch (error: any) {
            new ClientError(`Error en el repositorio de ${this.entity}`, 400);
            throw error.message;
        } finally {
            this.connection.close();
        }
    }

    public async insertOne(body: any) {
        try {
            await this.connection.connect();
            await this.connection
                .getDatabase()
                .collection(this.entity)
                .insertOne(body);
            return `${this.entity} insertado correctamente`;
        } catch (error: any) {
            new ClientError(`Error en el repositorio de ${this.entity}`, 400);
            throw error.message;
        } finally {
            this.connection.close();
        }
    }

    public async updateOne(id: any, body: any) {
        try {
            await this.connection.connect();
            await this.connection
                .getDatabase()
                .collection(this.entity)
                .updateOne({ _id: id }, { $set: body });
            return `${this.entity} actualizado correctamente`;
        } catch (error: any) {
            new ClientError(`Error en el repositorio de ${this.entity}`, 400);
            throw error.message;
        } finally {
            this.connection.close();
        }
    }

    public async deleteOne(id: any) {
        try {
            await this.connection.connect();
            await this.connection
                .getDatabase()
                .collection(this.entity)
                .deleteOne(id);
            return `${this.entity} eliminado correctamente`;
        } catch (error: any) {
            new ClientError(`Error en el repositorio de ${this.entity}`, 400);
            throw error.message;
        } finally {
            this.connection.close();
        }
    }
}
export default EquipoRepository;
