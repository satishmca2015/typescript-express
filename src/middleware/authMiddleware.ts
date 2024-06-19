// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler';
import { statusCode } from '../constant/statusCode';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Extend Request interface to include user property
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret as jwt.Secret, (err, user) => {
            if (err) {
                return sendResponse(res, statusCode.UNAUTHORIZED, [], 'Invalid token');
            }
            req.user = user;
            // console.log(req.user);
            next();
        });
    } else {
        return sendResponse(res, statusCode.UNAUTHORIZED, [], 'Token is missing');
    }
};
