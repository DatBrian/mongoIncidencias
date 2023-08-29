    import { Collection, Db, ObjectId } from "mongodb";

    class TrainerSchema {
    public database: Db;
    public entity: string;
    public collection: Collection;

    constructor(database: Db) {
        this.database = database;
        this.entity = "trainer";
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
                        required:[
                            '_id', "nombre", "jornada", "telefono", "email", "salon"
                        ],
                        properties:{
                            nombre:{
                                bsonType: "string",
                                description: "El campo nombre es requerido"
                            },
                            jornada:{
                                bsonType: "string",
                                description: "El campo jornada es requerido"
                            },
                            telefono:{
                                bsonType: "string",
                                description: "El campo telefono es requerido"
                            },
                            email:{
                                bsonType: "string",
                                description: "El campo email es requerido"
                            },
                            salon:{
                                bsonType: "string",
                                description: "El campo salon es requerido"
                            }
                        }
                    }
                }
            });
        } catch (error:any) {
            console.log("Error al generar el esquema de trainer");
            throw error.message;
        }
    }

    public async createData(): Promise<void>{
        try {
            await this.collection.insertMany([
                {
                    nombre: "Miguel Castro",
                    jornada: "Mañana",
                    telefono: "+57 321 548 6549",
                    email: "MiguelCas@gmail.com",
                    salon: "Sputnik"
                },
                {
                    nombre: "Carlos Rueda",
                    jornada: "Tarde",
                    telefono: "+57 311 485 6945",
                    email: "CarlosRue@gmail.com",
                    salon: "Sputnik"
                },
                {
                    nombre: "Vermen",
                    jornada: "Mañana",
                    telefono: "+57 389 455 4545",
                    email: "Vermen@gmail.com",
                    salon: "Artemis"
                },
                {
                    nombre: "Johlver",
                    jornada: "Mañana",
                    telefono: "+57 365 275 4585",
                    email: "Johlver@gmail.com",
                    salon: "Apolo"
                }
            ]);
        } catch (error) {
            throw error;
        }
    }

    public async getIds(): Promise<ObjectId[]> {
        try {
            const trainers = await this.collection.find({}).toArray();
            return trainers.map(trainer => trainer._id);
        } catch (error) {
            throw error;
        }
    }
    }
    export default TrainerSchema;