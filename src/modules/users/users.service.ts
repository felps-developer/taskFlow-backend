import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersParamsDto, PaginatedResult } from './dto/list-users.dto';
import { generateHash } from '../../utils/encrypt.util';
import { BadRequestError } from '../../utils/errors.util';
import { omit } from 'lodash';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(params: ListUsersParamsDto): Promise<PaginatedResult<User>> {
    try {
      return await this.usersRepository.findAll(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao buscar usuários: ${(error as Error).message}`,
      );
    }
  }

  async list(params: ListUsersParamsDto): Promise<User[]> {
    try {
      return await this.usersRepository.list(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao listar usuários: ${(error as Error).message}`,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string, showPassword = false): Promise<User | null> {
    try {
      return await this.usersRepository.findByEmail(email, showPassword);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao buscar usuário: ${(error as Error).message}`,
      );
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    if (!createDto.password) {
      throw new BadRequestError('Senha é obrigatória');
    }

    // Verifica se email já existe
    const existingUser = await this.usersRepository.findByEmail(
      createDto.email,
    );
    if (existingUser) {
      throw new BadRequestError('Email já cadastrado');
    }

    try {
      const userData = Object.assign({}, omit(createDto, ['password']));
      const password = await generateHash(createDto.password);
      Object.assign(userData, { password });

      const result = await this.usersRepository.create(userData as CreateUserDto);
      return result;
    } catch (error) {
      throw new BadRequestError(
        `Erro ao criar usuário: ${(error as Error).message}`,
      );
    }
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    try {
      const userData = Object.assign({}, omit(updateDto, ['password']));

      if (updateDto.password) {
        const password = await generateHash(updateDto.password);
        Object.assign(userData, { password });
      }

      // Se estiver atualizando email, verifica se já existe
      if (updateDto.email) {
        const existingUser = await this.usersRepository.findByEmail(
          updateDto.email,
        );
        if (existingUser && existingUser.id !== id) {
          throw new BadRequestError('Email já cadastrado');
        }
      }

      const result = await this.usersRepository.update(id, userData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.usersRepository.remove(id);
      return {
        success: true,
        message: `Registros removidos: ${result}`,
      };
    } catch (error) {
      throw error;
    }
  }
}

