import { ObjectId } from "mongodb";
import IncidenciaRepository from "../repositories/TrainerRepository";

class IncidenciaService {
    private readonly repository: IncidenciaRepository;

    constructor() {
        this.repository = new IncidenciaRepository();
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
export default IncidenciaService;
