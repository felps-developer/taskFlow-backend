import { TasksRepository } from './tasks.repository';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksParamsDto, PaginatedResult } from './dto/list-tasks.dto';
import { BadRequestError } from '../../utils/errors.util';
import { UsersRepository } from '../users/users.repository';

export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(params: ListTasksParamsDto): Promise<PaginatedResult<Task>> {
    try {
      return await this.tasksRepository.findAll(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao buscar tarefas: ${(error as Error).message}`,
      );
    }
  }

  async list(params: ListTasksParamsDto): Promise<Task[]> {
    try {
      return await this.tasksRepository.list(params);
    } catch (error) {
      throw new BadRequestError(
        `Erro ao listar tarefas: ${(error as Error).message}`,
      );
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      return await this.tasksRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async create(createDto: CreateTaskDto): Promise<Task> {
    // Verifica se o responsável existe
    try {
      await this.usersRepository.findOne(createDto.responsible_id);
    } catch (error) {
      throw new BadRequestError('Responsável não encontrado');
    }

    try {
      const result = await this.tasksRepository.create(createDto);
      return result;
    } catch (error) {
      throw new BadRequestError(
        `Erro ao criar tarefa: ${(error as Error).message}`,
      );
    }
  }

  async update(id: string, updateDto: UpdateTaskDto): Promise<Task> {
    // Se estiver atualizando o responsável, verifica se existe
    if (updateDto.responsible_id) {
      try {
        await this.usersRepository.findOne(updateDto.responsible_id);
      } catch (error) {
        throw new BadRequestError('Responsável não encontrado');
      }
    }

    try {
      const result = await this.tasksRepository.update(id, updateDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.tasksRepository.remove(id);
      return {
        success: true,
        message: `Registros removidos: ${result}`,
      };
    } catch (error) {
      throw error;
    }
  }
}

