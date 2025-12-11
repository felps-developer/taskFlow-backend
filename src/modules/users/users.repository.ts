import { Knex } from 'knex';
import { db } from '../../infra/database/database';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersParamsDto, PaginatedResult } from './dto/list-users.dto';
import { NotFoundError } from '../../utils/errors.util';

export class UsersRepository {
  private readonly table = 'users';
  private readonly defaultSelectFields = [
    'users.id',
    'users.name',
    'users.email',
    'users.role',
    'users.created_at',
    'users.updated_at',
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

        if (key === 'id') {
          qb.where(`${this.table}.${key}`, `${value}`);
          return;
        }

        if (key === 'role') {
          qb.where(`${this.table}.${key}`, `${value}`);
          return;
        }

        if (key === 'email') {
          qb.where(`${this.table}.${key}`, 'ilike', `%${value}%`);
        } else {
          qb.where(`${this.table}.${key}`, 'ilike', `%${value}%`);
        }
      });
    });
  }

  /**
   * Busca paginada e filtrada.
   */
  async findAll(params: ListUsersParamsDto): Promise<PaginatedResult<User>> {
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
      .orderBy('name', 'asc')
      .select(this.defaultSelectFields)
      .limit(limit)
      .offset(offset)) as User[];

    // Calcula última página
    const last_page = limit > 0 ? Math.ceil(total / limit) : 1;

    return { data, total, page: +page, last_page: +last_page, limit: +limit };
  }

  /**
   * Listagem simples (sem paginação).
   */
  async list(filters: ListUsersParamsDto): Promise<User[]> {
    const results = (await this.defaultQuery(filters)
      .clone()
      .select(this.defaultSelectFields)
      .orderBy('name', 'asc')) as User[];

    return results;
  }

  /**
   * Busca individual por ID.
   */
  async findOne(id: string, showPassword = false): Promise<User> {
    const selectFields = showPassword
      ? [...this.defaultSelectFields, 'users.password']
      : this.defaultSelectFields;

    const record = (await db(this.table)
      .where({ id })
      .select(selectFields)
      .first()) as User;

    if (!record) {
      throw new NotFoundError(`Usuário com ID ${id} não encontrado`);
    }

    return record;
  }

  /**
   * Busca por email.
   */
  async findByEmail(email: string, showPassword = false): Promise<User | null> {
    const selectFields = showPassword
      ? [...this.defaultSelectFields, 'users.password']
      : this.defaultSelectFields;

    const record = (await db(this.table)
      .where({ email })
      .select(selectFields)
      .first()) as User | undefined;

    return record || null;
  }

  /**
   * Cria um novo usuário.
   */
  async create(data: CreateUserDto): Promise<User> {
    const [inserted] = (await db(this.table)
      .insert(data)
      .returning(this.defaultSelectFields)) as User[];

    return inserted;
  }

  /**
   * Atualiza um usuário.
   */
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const count = await db(this.table).where({ id }).update(data);

    if (count === 0) {
      throw new NotFoundError(`Usuário com ID ${id} não encontrado`);
    }

    return this.findOne(id);
  }

  /**
   * Remove um usuário.
   */
  async remove(id: string): Promise<number> {
    const count = await db(this.table).where({ id }).delete();

    if (count === 0) {
      throw new NotFoundError(`Usuário com ID ${id} não encontrado`);
    }

    return count;
  }
}

