import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.util';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token não fornecido');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedError('Token inválido');
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedError('Token mal formatado');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Token inválido');
    }
    throw error;
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    throw new UnauthorizedError('Usuário não autenticado');
  }

  if (req.user.role !== 'admin') {
    throw new UnauthorizedError('Acesso negado. Apenas administradores.');
  }

  next();
};

