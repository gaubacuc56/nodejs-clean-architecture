import Joi from "joi";

const signup = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
        name: Joi.string().required(),
    }),
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    }),
};
const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
};
const resetPassword = {
    body: Joi.object().keys({
        resetKey: Joi.string().required(),
        newPassword: Joi.string().required().min(5),
    }),
};
const changePassword = {
    body: Joi.object().keys({
        oldPassword: Joi.string().required().min(5),
        newPassword: Joi.string().required().min(5),
    }).unknown(true),
};
export const authValidation = {
    signup,
    login,
    forgotPassword,
    changePassword,
    resetPassword,
};
