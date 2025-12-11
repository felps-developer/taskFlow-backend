import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersParamsDto } from './dto/list-users.dto';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    const usersRepository = new UsersRepository();
    this.usersService = new UsersService(usersRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createDto: CreateUserDto = req.body;
    const user = await this.usersService.create(createDto);
    return res.status(201).json({
      success: true,
      data: user,
    });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const params: ListUsersParamsDto = {
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      name: req.query.name as string,
      email: req.query.email as string,
      role: req.query.role as 'admin' | 'funcionario',
    };
    const result = await this.usersService.findAll(params);
    return res.status(200).json({
      success: true,
      ...result,
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const params: ListUsersParamsDto = {
      name: req.query.name as string,
      email: req.query.email as string,
      role: req.query.role as 'admin' | 'funcionario',
    };
    const users = await this.usersService.list(params);
    return res.status(200).json({
      success: true,
      data: users,
    });
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.usersService.findOne(id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateDto: UpdateUserDto = req.body;
    const user = await this.usersService.update(id, updateDto);
    return res.status(200).json({
      success: true,
      data: user,
    });
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.usersService.remove(id);
    return res.status(200).json(result);
  }
}

