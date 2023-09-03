import { ObjectId } from "mongodb";
import TrainersRepository from "../repositories/TrainerRepository";

class TrainersService {
    private readonly repository: TrainersRepository;

    constructor() {
        this.repository = new TrainersRepository();
    }

    public async getAll(): Promise<any> {
        return await this.repository.getAll();
    }

    public async getById(id: any): Promise<any> {
        const objectId = new ObjectId(id);
        return await this.repository.getById(objectId);
    }

    public async insertOne(body: any): Promise<string> {
        return await this.repository.insertOne(body);
    }

    public async updateOne(id: any, body: any): Promise<string> {
        return await this.repository.updateOne(id, body);
    }

    public async deleteOne(id: any): Promise<string> {
        return await this.repository.deleteOne(id);
    }
}
export default TrainersService;
