import { body } from 'express-validator';

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  type?: 'landing_page' | 'edicao' | 'api' | 'manutencao' | 'urgente';
  responsible_id?: string;
  status?: 'pendente' | 'fazendo' | 'concluido';
  deadline?: string; // ISO string
}

export const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Título deve ter entre 3 e 255 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Descrição deve ter no mínimo 10 caracteres'),
  body('type')
    .optional()
    .isIn(['landing_page', 'edicao', 'api', 'manutencao', 'urgente'])
    .withMessage(
      'Tipo deve ser: landing_page, edicao, api, manutencao ou urgente',
    ),
  body('responsible_id')
    .optional()
    .isUUID()
    .withMessage('ID do responsável inválido'),
  body('status')
    .optional()
    .isIn(['pendente', 'fazendo', 'concluido'])
    .withMessage('Status deve ser: pendente, fazendo ou concluido'),
  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Prazo deve ser uma data válida (ISO 8601)'),
];

