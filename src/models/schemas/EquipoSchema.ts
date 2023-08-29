import { Collection, Db, ObjectId } from "mongodb";

class EquipoSchema{
    public database:Db;
    public entity: string;
    public collection: Collection;

    constructor(database:Db){
        this.database = database;
        this.entity = "equipo";
        this.collection = this.database.collection(this.entity);
    }

    public async generateCollection():Promise<void>{
        try {
            await this.database.createCollection(this.entity,{
                capped: true,
                size: 16000,
                max: 100,
                validator:{
                    $jsonSchema:{
                        bsonType: "object",
                        required: [
                            "_id", "pantalla", "torre", "teclado", "mouse", "diadema", "salon"
                        ],
                        properties:{
                            pantalla:{
                                bsonType: "object",
                                required:[
                                    "marca", "color", "estado"
                                ],
                                properties:{
                                    marca:{
                                        bsonType: "string"
                                    },
                                    color: {
                                        bsonType: "string"
                                    },
                                    estado:{
                                        bsonType: "string"
                                    }
                                }
                            },
                            torre:{
                                bsonType: "object",
                                required:[
                                    "marca", "color", "estado"
                                ],
                                properties:{
                                    marca:{
                                        bsonType: "string"
                                    },
                                    color: {
                                        bsonType: "string"
                                    },
                                    estado:{
                                        bsonType: "string"
                                    }
                                }
                            },
                            teclado:{
                                bsonType: "object",
                                required:[
                                    "marca", "color", "estado"
                                ],
                                properties:{
                                    marca:{
                                        bsonType: "string"
                                    },
                                    color: {
                                        bsonType: "string"
                                    },
                                    estado:{
                                        bsonType: "string"
                                    }
                                }
                            },
                            mouse:{
                                bsonType: "object",
                                required:[
                                    "marca", "color", "estado"
                                ],
                                properties:{
                                    marca:{
                                        bsonType: "string"
                                    },
                                    color: {
                                        bsonType: "string"
                                    },
                                    estado:{
                                        bsonType: "string"
                                    }
                                }
                            },
                            diadema:{
                                bsonType: "object",
                                required:[
                                    "marca", "color", "estado"
                                ],
                                properties:{
                                    marca:{
                                        bsonType: "string"
                                    },
                                    color: {
                                        bsonType: "string"
                                    },
                                    estado:{
                                        bsonType: "string"
                                    }
                                }
                            },
                            salon:{
                                bsonType: "string"
                            }
                        }
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

    public async createData():Promise<ObjectId[]>{
        try {
            const result = await this.collection.insertMany([
                {
                    pantalla: {
                    marca: "Marca Pantalla 1",
                    color: "Rojo",
                    estado: "Funcionando"
                },
                torre: {
                    marca: "Marca Torre 1",
                    color: "Negro",
                    estado: "Funcionando"
                },
                teclado: {
                    marca: "Marca Teclado 1",
                    color: "Blanco",
                    estado: "Funcionando"
                },
                mouse: {
                    marca: "Marca Mouse 1",
                    color: "Azul",
                    estado: "Funcionando"
                },
                diadema: {
                    marca: "Marca Diadema 1",
                    color: "Negro",
                    estado: "Funcionando"
                },
                salon: "Sala A"
            },
            {
                pantalla: {
                    marca: "Marca Pantalla 3",
                    color: "Blanco",
                    estado: "Funcionando"
                },
                torre: {
                    marca: "Marca Torre 3",
                    color: "Negro",
                    estado: "Funcionando"
                },
                teclado: {
                    marca: "Marca Teclado 3",
                    color: "Gris",
                    estado: "Funcionando"
                },
                mouse: {
                    marca: "Marca Mouse 3",
                    color: "Blanco",
                    estado: "Funcionando"
                },
                diadema: {
                    marca: "Marca Diadema 3",
                    color: "Azul",
                    estado: "Funcionando"
                },
                salon: "Sala C"
            },
            {
                pantalla: {
                    marca: "Marca Pantalla 2",
                    color: "Negro",
                    estado: "Funcionando"
                },
                torre: {
                    marca: "Marca Torre 2",
                    color: "Gris",
                    estado: "Funcionando"
                },
                teclado: {
                    marca: "Marca Teclado 2",
                    color: "Negro",
                    estado: "Funcionando"
                },
                mouse: {
                    marca: "Marca Mouse 2",
                    color: "Rojo",
                    estado: "Funcionando"
                },
                diadema: {
                    marca: "Marca Diadema 2",
                    color: "Blanco",
                    estado: "Funcionando"
                },
                salon: "Sala B"
            }
            ]);

            return result.insertedIds as ObjectId[];
        } catch (error) {
            throw error;
        }
    }

    public async getIds(): Promise<ObjectId[]> {
        try {
            const equipos = await this.collection.find({}).toArray();
            return equipos.map(equipo => equipo._id);
        } catch (error) {
            throw error;
        }
    }
}
export default EquipoSchema;