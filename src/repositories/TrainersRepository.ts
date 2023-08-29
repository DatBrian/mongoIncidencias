import { Collection } from "mongodb";
import Connection from "../db/Connection";

class TrainersRepository {
    private connection: Connection;
    private entity:string;
    private collection:Collection;
    constructor(){
        this.connection = new Connection();
        this.entity = "trainers";
        this.collection = this.connection.getDatabase().collection(this.entity);
    }

    protected async getAll(){
        try {
            await this.connection.connect();
            
        } catch (error) {
            
        }
    }
}