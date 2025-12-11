import { body } from 'express-validator';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'funcionario';
}

export const createUserValidation = [
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
    .notEmpty()
    .withMessage('Role é obrigatória')
    .isIn(['admin', 'funcionario'])
    .withMessage('Role deve ser "admin" ou "funcionario"'),
];

