import { body } from 'express-validator';

export const validateSignUpUser = [
    body('username')
        .trim()
        .notEmpty().withMessage('username is required')
        .isString().withMessage('username is must have string'),
    body('email')
        .isEmail()
        .withMessage('email must be a valid email address'),
    body('password')
        .notEmpty().withMessage('password is required'),
];

export const validateSignInUser = [
    body('email')
        .trim()
        .notEmpty().withMessage('username is required')
        .isEmail()
        .withMessage('email must be a valid email address'),
    body('password')
        .notEmpty().withMessage('password is required'),
];

