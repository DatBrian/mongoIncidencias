import { Db } from "mongodb";

class AutoIncrementSchema {
  public database: Db;
  public entity: string;
  public Collection: any;

  constructor(database: Db) {
    this.database = database;
    this.entity = "autoincrement";
    this.Collection = database.collection(this.entity);
  }

  public async generateCollection(): Promise<void> {
    try {
      await this.database.createCollection(this.entity);
    } catch (error) {
      throw error;
    }
  }

  public async createData(): Promise<void> {
    try {
      await this.Collection.insertOne({
        _id: "rolId",
        sequence_value: 0,
      });
    } catch (error) {
      throw error;
    }
  }

  public async increment(entity: string): Promise<any> {
    const sequenceDocument = await this.Collection.findOneAndUpdate(
      { _id: `${entity}Id` },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after" }
    );

    return sequenceDocument.value.sequence_value;
  }
}
export default AutoIncrementSchema;
