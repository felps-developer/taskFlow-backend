import { body } from 'express-validator';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'funcionario';
}

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3, max: 255 })
    .withMessage('Nome deve ter entre 3 e 255 caracteres'),
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
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('role')
    .optional()
    .isIn(['admin', 'funcionario'])
    .withMessage('Role deve ser "admin" ou "funcionario"'),
];

