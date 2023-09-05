import { check } from "express-validator";

export const IncidenciaDTO = [
    check("category")
        .notEmpty()
        .withMessage("El campo category es obligatorio")
        .isString()
        .withMessage("El campo category debee ser un string"),

    check("type")
        .notEmpty()
        .withMessage("El campo type es obligatorio")
        .isString()
        .withMessage("El campo type debe ser un string"),

    check("description")
        .notEmpty()
        .withMessage("El campo description es obligatorio")
        .isString()
        .withMessage("El campo description debe ser un string"),

    check("date")
        .notEmpty()
        .withMessage("El campo date es obligatorio")
        .isString()
        .withMessage("El campo date debe ser un string")
        .matches(/^(?:\\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/)
        .withMessage("Solo admite numeros en formato 0000-00-00 "),
    
    check("equipment")
        .notEmpty().withMessage("El campo equipment es obligatorio")
        .isString().withMessage("El campo equipment debe ser un string"),
    
    check("location")
        .notEmpty().withMessage("El campo location es obligatorio")
        .isString().withMessage("El campo location debe ser un string"),
    
    check("name_salon")
        .notEmpty().withMessage("El campo name_salon es obligatorio")
        .isString().withMessage("El campo name_salon debe ser un string"),
    
    check("area")
        .notEmpty().withMessage("El campo area es obligatorio")
        .isString().withMessage("El campo area debe ser un string"),

    check("trainer")
        .notEmpty().withMessage("El campo trainer es obligatorio")
        .isString().withMessage("El campo trainer debe ser un string")
];
