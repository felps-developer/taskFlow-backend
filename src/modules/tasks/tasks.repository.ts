import { db } from '../../infra/database/database';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksParamsDto, PaginatedResult } from './dto/list-tasks.dto';
import { NotFoundError } from '../../utils/errors.util';

export class TasksRepository {
  private readonly table = 'tasks';
  private readonly defaultSelectFields = [
    'tasks.id',
    'tasks.title',
    'tasks.description',
    'tasks.type',
    'tasks.responsible_id',
    'tasks.status',
    'tasks.deadline',
    'tasks.created_at',
    'tasks.updated_at',
  ];

  /**
   * Constrói o query builder aplicando filtros recebidos.
   */
  private defaultQuery(filters: Record<string, any> = {}) {
    return db(this.table).modify((qb) => {
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          return;
        }

        if (key === 'id' || key === 'responsible_id') {
          qb.where(`${this.table}.${key}`, `${value}`);
          return;
        }

        if (key === 'type' || key === 'status') {
          qb.where(`${this.table}.${key}`, `${value}`);
          return;
        }

        if (key === 'title') {
          qb.where(`${this.table}.${key}`, 'ilike', `%${value}%`);
        }
      });
    });
  }

  /**
   * Busca paginada e filtrada.
   */
  async findAll(params: ListTasksParamsDto): Promise<PaginatedResult<Task>> {
    const { page = 1, limit = 10, ...filters } = params;

    // Total de registros
    const countResult = await this.defaultQuery(filters)
      .clone()
      .count('* as count')
      .first();

    const total = Number(countResult?.count || 0);

    // Lista de dados
    const offset = (page - 1) * limit;
    const data = (await this.defaultQuery(filters)
      .clone()
      .orderBy('created_at', 'desc')
      .select([
        ...this.defaultSelectFields,
        'users.name as responsible_name',
      ])
      .leftJoin('users', 'tasks.responsible_id', 'users.id')
      .limit(limit)
      .offset(offset)) as Task[];

    // Calcula última página
    const last_page = limit > 0 ? Math.ceil(total / limit) : 1;

    return { data, total, page: +page, last_page: +last_page, limit: +limit };
  }

  /**
   * Listagem simples (sem paginação).
   */
  async list(filters: ListTasksParamsDto): Promise<Task[]> {
    const results = (await this.defaultQuery(filters)
      .clone()
      .orderBy('created_at', 'desc')
      .select([
        ...this.defaultSelectFields,
        'users.name as responsible_name',
      ])
      .leftJoin('users', 'tasks.responsible_id', 'users.id')) as Task[];

    return results;
  }

  /**
   * Busca individual por ID.
   */
  async findOne(id: string): Promise<Task> {
    const record = (await db(this.table)
      .where({ 'tasks.id': id })
      .select([
        ...this.defaultSelectFields,
        'users.name as responsible_name',
      ])
      .leftJoin('users', 'tasks.responsible_id', 'users.id')
      .first()) as Task | undefined;

    if (!record) {
      throw new NotFoundError(`Tarefa com ID ${id} não encontrada`);
    }

    return record;
  }

  /**
   * Cria uma nova tarefa.
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const taskData = {
      ...data,
      status: data.status || 'pendente',
      deadline: new Date(data.deadline),
    };

    const [inserted] = (await db(this.table)
      .insert(taskData)
      .returning(this.defaultSelectFields)) as Task[];

    return this.findOne(inserted.id);
  }

  /**
   * Atualiza uma tarefa.
   */
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const updateData: any = { ...data };
    if (data.deadline) {
      updateData.deadline = new Date(data.deadline);
    }

    const count = await db(this.table).where({ id }).update(updateData);

    if (count === 0) {
      throw new NotFoundError(`Tarefa com ID ${id} não encontrada`);
    }

    return this.findOne(id);
  }

  /**
   * Remove uma tarefa.
   */
  async remove(id: string): Promise<number> {
    const count = await db(this.table).where({ id }).delete();

    if (count === 0) {
      throw new NotFoundError(`Tarefa com ID ${id} não encontrada`);
    }

    return count;
  }
}

