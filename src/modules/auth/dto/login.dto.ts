import { body } from 'express-validator';

export interface LoginDto {
  email: string;
  password: string;
}

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 1 })
    .withMessage('Senha é obrigatória'),
];

