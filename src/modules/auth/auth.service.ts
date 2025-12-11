import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compare } from '../../utils/encrypt.util';
import { UnauthorizedError, BadRequestError } from '../../utils/errors.util';

export class AuthService {
  private usersService: UsersService;

  constructor() {
    const usersRepository = new UsersRepository();
    this.usersService = new UsersService(usersRepository);
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    try {
      const userData = {
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
        role: registerDto.role || 'funcionario',
      };

      const user = await this.usersService.create(userData);
      const accessToken = this.generateToken(user.id, user.email, user.role);

      return { access_token: accessToken };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findByEmail(
        loginDto.email,
        true, // showPassword
      );

      if (!user) {
        throw new UnauthorizedError('Email ou senha inválidos');
      }

      const isValid = await compare(loginDto.password, user.password);
      if (!isValid) {
        throw new UnauthorizedError('Email ou senha inválidos');
      }

      const accessToken = this.generateToken(user.id, user.email, user.role);

      return { access_token: accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Erro ao fazer login');
    }
  }

  private generateToken(
    id: string,
    email: string,
    role: string,
  ): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.sign({ id, email, role }, secret, {
      expiresIn: '7d',
    });
  }
}

