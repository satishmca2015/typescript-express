import { body } from 'express-validator';

export const validateCreateUser = [
    body('username')
        .trim()
        .notEmpty().withMessage('username is required')
        .isString().withMessage('username is must have string'),
    body('email')
        .isEmail()
        .withMessage('email must be a valid email address'),
    body('password')
        .notEmpty().withMessage('password must have value'),
];

export const validateupdateUser = [
    body('username')
        .trim()
        .notEmpty().withMessage('username is required')
        .isString().withMessage('username is must have string'),
    body('email')
        .isEmail()
        .withMessage('email must be a valid email address')
];