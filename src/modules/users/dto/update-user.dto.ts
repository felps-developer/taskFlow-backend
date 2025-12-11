import { body } from 'express-validator';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'funcionario';
}

export const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Nome deve ter entre 3 e 255 caracteres'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('role')
    .optional()
    .isIn(['admin', 'funcionario'])
    .withMessage('Role deve ser "admin" ou "funcionario"'),
];

