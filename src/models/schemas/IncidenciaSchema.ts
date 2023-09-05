import { Collection, Db } from "mongodb";
import TrainerSchema from "./TrainerSchema";
import EquipoSchema from "./EquipoSchema";

class IncidenciaSchema {
    public database: Db;
    public entity: string;
    public collection: Collection;

    constructor(database: Db) {
        this.database = database;
        this.entity = "incidencia";
        this.collection = this.database.collection(this.entity);
    }

    public static async properties() {
        return {
            categoria: {
                bsonType: "string",
            },
            tipo: {
                bsonType: "string",
            },
            descripcion: {
                bsonType: "string",
            },
            fecha: {
                bsonType: "string",
            },
            equipo: {
                bsonType: "objectId",
            },
            ubicacion: {
                bsonType: "object",
                required: ["salon", "area"],
                properties: {
                    salon: {
                        bsonType: "string",
                    },
                    area: {
                        bsonType: "string",
                    },
                },
            },
            trainer_reportante: {
                bsonType: "objectId",
            },
        };
    }

    public async generateCollection(): Promise<void> {
        try {
            await this.database.createCollection(this.entity, {
                capped: true,
                size: 16000,
                max: 100,
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: [
                            "_id",
                            "categoria",
                            "tipo",
                            "descripcion",
                            "fecha",
                            "equipo",
                            "ubicacion",
                            "trainer_reportante",
                        ],
                        properties: {
                            categoria: {
                                bsonType: "string",
                            },
                            tipo: {
                                bsonType: "string",
                            },
                            descripcion: {
                                bsonType: "string",
                            },
                            fecha: {
                                bsonType: "string",
                            },
                            equipo: {
                                bsonType: "objectId",
                            },
                            ubicacion: {
                                bsonType: "object",
                                required: ["salon", "area"],
                                properties: {
                                    salon: {
                                        bsonType: "string",
                                    },
                                    area: {
                                        bsonType: "string",
                                    },
                                },
                            },
                            trainer_reportante: {
                                bsonType: "objectId",
                            },
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    public async createData(): Promise<void> {
        try {
            const trainers = await new TrainerSchema(this.database).getIds();
            const equipos = await new EquipoSchema(this.database).getIds();

            await this.collection.insertMany([
                {
                    categoria: "Cuidado",
                    tipo: "Preventivo",
                    descripcion: "Limpieza y revisión de equipos",
                    fecha: "2023-05-30",
                    equipo: equipos[0],
                    ubicacion: {
                        salon: "review",
                        area: "software review",
                    },
                    trainer_reportante: trainers[0],
                },
                {
                    categoria: "Falla",
                    tipo: "Daño",
                    descripcion: "El mouse no funciona",
                    fecha: "2023-06-15",
                    equipo: equipos[1],
                    ubicacion: {
                        salon: "Apolo",
                        area: "Software Skills",
                    },
                    trainer_reportante: trainers[1],
                },
                {
                    categoria: "Pérdida",
                    tipo: "Perdida",
                    descripcion: "Falta una silla",
                    fecha: "2023-07-20",
                    equipo: equipos[2],
                    ubicacion: {
                        salon: "Artemis",
                        area: "Software Skills",
                    },
                    trainer_reportante: trainers[2],
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}
export default IncidenciaSchema;
