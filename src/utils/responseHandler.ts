// utils/responseHandler.ts
import { Response } from 'express';

export function sendResponse (res: Response,statusCode: number,data: any,message: string = ''){
    const jsonObj = {
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
    message,
    data,
    };
    res.status(statusCode).json(jsonObj);
};
