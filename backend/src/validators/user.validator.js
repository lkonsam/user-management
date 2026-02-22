import userModel from "../models/user.model.js";
import { validateSchema } from "../middlewares/validation.middleware.js";

export const createUserValidator = validateSchema(userModel.createUserSchema);
export const updateUserValidator = validateSchema(userModel.updateUserSchema);
export const updateUserStatusValidator = validateSchema(userModel.updateStatusSchema);

