import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendResponse } from "../utils/responseHandler";
import { statusCode } from "../constant/statusCode";
import { AuthService } from "../services/auth-service";
import { responseMessage } from "../constant/responseMessage";
import { generateToken } from "../utils/jwt";

const authService = new AuthService();

export class AuthController{
 
    static async createUser(req:Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map(err => ({
                message: err.msg
            }));
            return sendResponse(res, statusCode.BAD_REQUEST, validationErrors, responseMessage.validationFailed);
        }
        try {
            const { username, email, password } = req.body;
            const user = await authService.signUp(username, email, password);
            return sendResponse(res, statusCode.CREATED, user, responseMessage.userCreated);
        } catch (error: any) {
            return sendResponse(res, statusCode.BAD_REQUEST, { message: error.message }, 'Error in creation');
        }
    }

    static async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map(err => ({
                message: err.msg
            }));
            return sendResponse(res, statusCode.BAD_REQUEST, validationErrors, responseMessage.validationFailed);
        }
        try {
          const { email, password } = req.body;
          const user = await authService.signIn(email, password);
          const token = generateToken({ id: user.id, email: user.email });
          return sendResponse(res, statusCode.OK, { user, token }, 'Login successful');
        } catch (error: any) {
          return sendResponse(res, statusCode.BAD_REQUEST, null, error.message);
        }
      }

    


}