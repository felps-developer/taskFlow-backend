import { Request, Response } from 'express';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { UsersRepository } from '../users/users.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksParamsDto } from './dto/list-tasks.dto';

export class TasksController {
  private tasksService: TasksService;

  constructor() {
    const tasksRepository = new TasksRepository();
    const usersRepository = new UsersRepository();
    this.tasksService = new TasksService(tasksRepository, usersRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createDto: CreateTaskDto = req.body;
    const task = await this.tasksService.create(createDto);
    return res.status(201).json({
      success: true,
      data: task,
    });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const params: ListTasksParamsDto = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      title: req.query.title as string,
      type: req.query.type as
        | 'landing_page'
        | 'edicao'
        | 'api'
        | 'manutencao'
        | 'urgente',
      status: req.query.status as 'pendente' | 'fazendo' | 'concluido',
      responsible_id: req.query.responsible_id as string,
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };
    const result = await this.tasksService.findAll(params);
    return res.status(200).json({
      success: true,
      ...result,
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const params: ListTasksParamsDto = {
      title: req.query.title as string,
      type: req.query.type as
        | 'landing_page'
        | 'edicao'
        | 'api'
        | 'manutencao'
        | 'urgente',
      status: req.query.status as 'pendente' | 'fazendo' | 'concluido',
      responsible_id: req.query.responsible_id as string,
      start_date: req.query.start_date as string,
      end_date: req.query.end_date as string,
    };
    const tasks = await this.tasksService.list(params);
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const task = await this.tasksService.findOne(id);
    return res.status(200).json({
      success: true,
      data: task,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateDto: UpdateTaskDto = req.body;
    const task = await this.tasksService.update(id, updateDto);
    return res.status(200).json({
      success: true,
      data: task,
    });
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.tasksService.remove(id);
    return res.status(200).json(result);
  }
}

