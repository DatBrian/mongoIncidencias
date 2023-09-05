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
];
