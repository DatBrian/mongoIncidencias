import { Collection, Db } from "mongodb";

class UsuariosSchema {
  public database: Db;
  public entity: string;
  Collection: Collection;

  constructor(database: Db) {
    this.database = database;
    this.entity = "usuarios";
    this.Collection = database.collection(this.entity);
  }

  public async generateCollection(): Promise<void> {
    try {
      await this.database.createCollection(this.entity, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            additionalProperties: false,
            required: ["cc", "nombre", "rol"],
            properties: {
              _id: {
                bsonType: "objectId",
              },
              cc: {
                bsonType: "int",
                description:
                  "La cedula es obligatorio y tiene que se de tipo numerico",
              },
              nombre: {
                bsonType: "string",
                description: "El nombre es obligatorio y solo resive letras",
                pattern: "^[a-zA-Z ]+$",
              },
              rol: {
                bsonType: "array",
                description: "El rol es obligatorio",
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
            },
          },
        },
      });
    } catch (error) {
        throw error;
    }
  }
    
    public async createData(): Promise<void>{
        try {
            await this.Collection.insertMany([
              {
                cc: 123456789,
                nombre: "Marcos",
                rol: [1],
                permisos: {
                  "/user": ["1.0.0", "3.5.0"],
                },
              },
              {
                cc: 456789123,
                nombre: "Jhon",
                rol: [2],
                permisos: {
                  "/user": ["*"],
                },
              },
            ]);
        } catch (error) {
            throw error;
        }
    }
}
export default UsuariosSchema;