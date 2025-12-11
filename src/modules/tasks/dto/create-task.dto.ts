import { body } from 'express-validator';

export interface CreateTaskDto {
  title: string;
  description: string;
  type: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente';
  responsible_id: string;
  status?: 'pendente' | 'fazendo' | 'concluido';
  deadline: string; // ISO string
}

export const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 3, max: 255 })
    .withMessage('Título deve ter entre 3 e 255 caracteres'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Descrição é obrigatória')
    .isLength({ min: 10 })
    .withMessage('Descrição deve ter no mínimo 10 caracteres'),
  body('type')
    .notEmpty()
    .withMessage('Tipo é obrigatório')
    .isIn(['landing_page', 'edicao', 'api', 'manutencao', 'urgente'])
    .withMessage(
      'Tipo deve ser: landing_page, edicao, api, manutencao ou urgente',
    ),
  body('responsible_id')
    .notEmpty()
    .withMessage('Responsável é obrigatório')
    .isUUID()
    .withMessage('ID do responsável inválido'),
  body('status')
    .optional()
    .isIn(['pendente', 'fazendo', 'concluido'])
    .withMessage('Status deve ser: pendente, fazendo ou concluido'),
  body('deadline')
    .notEmpty()
    .withMessage('Prazo é obrigatório')
    .isISO8601()
    .withMessage('Prazo deve ser uma data válida (ISO 8601)'),
];

