import { validationResult } from "express-validator";

class ValidateDTOMiddleware {
    private dto: any;
    private properties: object;
    constructor(dto: any, schema: object) {
        this.dto = dto;
        this.properties = schema;
    }

    async mapProperties(req: any) {
        const updatedBody: any = {};

        const properties = Object.keys(this.properties).filter(
            (key) => key !== "_id"
        );

        const body = Object.values(req.body);

        for (let i = 0; i < properties.length; i++) {
            updatedBody[properties[i]] = body[i];
        }


        return updatedBody;
    }

    validate() {
        return async (req: any, res: any, next: any) => {
            await Promise.all(this.dto.map((field: any) => field.run(req)));
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            req.body = await this.mapProperties(req);

            next();
        };
    }
}

export default ValidateDTOMiddleware;
