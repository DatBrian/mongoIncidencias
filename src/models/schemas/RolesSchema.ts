import { Collection, Db } from "mongodb";
import AutoIncrementSchema from "./AutoincrementSchema";

class RolesSchema {
  public database: Db;
  public entity: string;
  public Collection: Collection;

  constructor(database: Db) {
    this.database = database;
    this.entity = "roles";
    this.Collection = database.collection(this.entity);
  }

  public async generateCollection(): Promise<void> {
    try {
      await this.database.createCollection(this.entity, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            additionalProperties: false,
            required: ["id", "nombre"],
            properties: {
              _id: {
                bsonType: "objectId",
              },
              id: {
                bsonType: "int",
                description:
                  "La cedula es obligatorio y tiene que se de tipo numerico",
              },
              nombre: {
                bsonType: "string",
                description:
                  '{"status": "402", "message": "El nombre_usuario es obligatorio y solo resive letras"}',
                pattern: "^[a-zA-Z ]+$",
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
      await this.Collection.insertMany([
        {
          id: Number(
            await new AutoIncrementSchema(this.database).increment("rol")
          ),
          nombre: "admin",
        },
        {
          id: Number(
            await new AutoIncrementSchema(this.database).increment("rol")
          ),
          nombre: "usuario",
        },
      ]);
    } catch (error) {
      throw error;
    }
  }
}
export default RolesSchema;
