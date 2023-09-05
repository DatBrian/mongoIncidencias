import { Collection, Db } from "mongodb";
import bcrypt from "bcryptjs";
import Connection from "../../db/Connection";

class UserSchema {
    public database: Db;
    public entity: string;
    Collection: Collection;

    constructor(database: Db) {
        this.database = database;
        this.entity = "user";
        this.Collection = database.collection(this.entity);
    }

    static registerProperties() {
        return {
            _id: {
                bsonType: "objectId",
            },
            user: {
                bsonType: "string",
            },
            contraseña: {
                bsonType: "sting",
            },
        };
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId",
            },
            user: {
                bsonType: "string",
                description: "username is required",
            },
            contraseña: {
                bsonType: "string",
                description: "Password is required",
            },
            rol: {
                bsonType: "array",
                description: "role",
                items: {
                    bsonType: "int",
                },
            },
            permisos: {
                bsonType: "object",
                description: "Ingrese los permisos",
                properties: {
                    "/user": {
                        bsonType: "array",
                        items: {
                            bsonType: "string",
                            description: "Ingrese la version autorizada",
                        },
                    },
                },
            },
        };
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        additionalProperties: false,
                        required: ["user", "contraseña", "rol"],
                        properties: {
                            _id: {
                                bsonType: "objectId",
                            },
                            user: {
                                bsonType: "string",
                                description: "username is required",
                            },
                            contraseña: {
                                bsonType: "string",
                                description: "Password is required",
                            },
                            rol: {
                                bsonType: "array",
                                description: "role",
                                items: {
                                    bsonType: "int",
                                },
                            },
                            permisos: {
                                bsonType: "object",
                                description: "Ingrese los permisos",
                                properties: {
                                    "/user": {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "string",
                                            description:
                                                "Ingrese la version autorizada",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    static async matchPassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }

    static async findUser(username: string) {
        const connection = new Connection();
        try {
            await connection.connect();
            const exist = await connection
                .getDatabase()
                .collection("user")
                .findOne({ user: username });
            return exist ? true : false;
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
    }

    static async createUser(user: any) {
        const connection = new Connection();
        try {
            await connection.connect();
            const encryptedPassword = await this.encryptPassword(
                user.contraseña
            );
            const newUser = {
                user: user.user,
                contraseña: encryptedPassword,
                rol: user.rol,
                permisos: user.permisos,
            };
            await connection
                .getDatabase()
                .collection("user")
                .insertOne(newUser);
            const response = {
                status: 200,
                message: "Usuario registrado correctamente",
                user: newUser,
            };
            return response;
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
    }

    async createData() {
        try {
            await this.Collection.insertMany([
                {
                    user: "Marcos",
                    contraseña: "contra1",
                    rol: [1],
                    permisos: {
                        "/animales": ["1.0.0", "3.5.0"],
                    },
                },
                {
                    user: "Jhon",
                    contraseña: "contra2",
                    rol: [2],
                    permisos: {
                        "/api/v1/animales": ["1.0.0"],
                    },
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}
export default UserSchema;
