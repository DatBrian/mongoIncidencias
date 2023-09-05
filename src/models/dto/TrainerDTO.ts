import { check } from "express-validator";

export const TrainerDTO = [
    check("name")
        .notEmpty()
        .withMessage("El campo name es obligatorio")
        .isString()
        .withMessage("El campo name debe ser un string"),

    check("jornada")
        .notEmpty()
        .withMessage("El campo journey es obligatorio")
        .isString()
        .withMessage("El campo journey debe ser un string"),


    check("phone")
        .notEmpty()
        .withMessage("El campo phone es obligatorio")
        .isString()
        .withMessage("El campo phone debe ser de tipo String"),


    check("mail")
        .notEmpty()
        .withMessage("El campo mail es obligatorio")
        .isString()
        .withMessage("El campo mail debe ser de tipo String"),

    check("nombre_salon")
        .notEmpty()
        .withMessage("El campo nombre_salon es obligatorio")
        .isString()
        .withMessage("El campo nombre_salon debe ser del tipo string"),
];
