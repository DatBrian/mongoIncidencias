import { ObjectId } from "mongodb";
import EquipoRepository from "../repositories/TrainerRepository";

class EquipoService {
    private readonly repository: EquipoRepository;

    constructor() {
        this.repository = new EquipoRepository();
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
export default EquipoService;
