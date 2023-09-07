import joi from 'joi'
import joiPwd from 'joi-password-complexity'
const complexityOptions = {
    min: 4,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
};

export const signUpSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "El email no puede estar vacio",
        "any.required": "El campo email es requerido",
        "string.email": "El email debe tener @ y .com"
    }),
    lastName: joi.string().required().messages({
        "string.empty": "El lastName no puede estar vacio",
        "any.required": "El campo lastName es requerido",
    }),
    password: joiPwd(complexityOptions).required().min(6).messages({
        "string.min": "El minimo es 6 caracteres",
        "any.required": "El campo password es requerido",
    }),
    name: joi.string().min(3).max(15).required().messages({
        "string.min": "El minimo es 3 caracteres",
        "any.required": "El campo Name es requerido",
    }),
    photo: joi.string().uri(),
    country: joi.string()
})