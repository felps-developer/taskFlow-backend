import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthRequest } from '../../middleware/auth.middleware';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';

export class AuthController {
  private authService: AuthService;
  private usersService: UsersService;

  constructor() {
    this.authService = new AuthService();
    const usersRepository = new UsersRepository();
    this.usersService = new UsersService(usersRepository);
  }

  async register(req: Request, res: Response): Promise<Response> {
    const registerDto: RegisterDto = req.body;
    const result = await this.authService.register(registerDto);
    return res.status(201).json({
      success: true,
      ...result,
    });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginDto: LoginDto = req.body;
    const result = await this.authService.login(loginDto);
    return res.status(200).json({
      success: true,
      ...result,
    });
  }

  async me(req: AuthRequest, res: Response): Promise<Response> {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado',
      });
    }

    const user = await this.usersService.findOne(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
}

