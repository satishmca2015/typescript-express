// controllers/UserController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { statusCode } from '../constant/statusCode';
import { UserService } from '../services/user-service';
import sequelize from '../config/sequelize';
import { sendResponse } from '../utils/responseHandler';
import { responseMessage } from '../constant/responseMessage';

const userService = new UserService();

export class UserController {
    // static async createUser(req: Request, res: Response) {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         const validationErrors = errors.array().map(err => ({
    //             message: err.msg
    //         }));
    //         return sendResponse(res, statusCode.BAD_REQUEST, validationErrors, responseMessage.validationFailed);
    //     }
    //     try {
    //         const { username, email, password } = req.body;
    //         const user = await userService.createUser(username, email, password);
    //         return sendResponse(res, statusCode.CREATED, user, responseMessage.userCreated);
    //     } catch (error: any) {
    //         return sendResponse(res, statusCode.BAD_REQUEST, { message: error.message }, 'Error in creation');
    //     }
    // }

    static async getUser(req: Request, res: Response) {
        try {
            const [users, metadata] = await sequelize.query('SELECT id,username,email FROM users');
            return sendResponse(res,statusCode.OK,users,'User list');
        } catch (error: any) {
            return sendResponse(res,statusCode.BAD_REQUEST,error,'failed to fetched');
        }
    }

    static async getUserById(req: Request, res: Response) {
        let { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (!user) {
                return sendResponse(res, statusCode.NOT_FOUND, null, 'User not found');
            }
            // return res.status(statusCode.OK).json(user);
            return sendResponse(res, statusCode.OK, user, 'User list');
        } catch (error: any) {
            return sendResponse(res, statusCode.BAD_REQUEST, error.message);
        }
    }

    static async updateUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map(err => ({
                message: err.msg
            }));
            //return res.status(statusCode.BAD_REQUEST).json({ status: 'failed', errors: validationErrors });
            return sendResponse(res, statusCode.BAD_REQUEST, validationErrors, 'Validation failed');
        }
        try {
            const updated = await userService.updateUser(req.params.id, req.body);
            if (!updated) throw new Error('Unable to update details');
            return sendResponse(res, statusCode.OK,null ,'Updated successfully!');
        } catch (error: any) {
            return sendResponse(res, statusCode.BAD_REQUEST, error.message);
        }
    }

    // static async deleteUser(req: Request, res: Response) {
    //     try {
    //         const deleted = await userService.deleteUser(req.params.id);
    //         if (!deleted) throw new Error('Unable to delete user');
    //         return res.status(statusCode.OK).json({ status: deleted, message: 'Deleted successfully!' });
    //     } catch (error: any) {
    //         return res.status(statusCode.BAD_REQUEST).json({ message: error.message });
    //     }
    // }
}
