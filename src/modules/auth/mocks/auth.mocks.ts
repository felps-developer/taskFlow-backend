import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

export const adminUser = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Admin Sistema',
  email: 'admin@taskflow.com',
  password: '$2b$10$ejofXdJkIItGG9ZdrPdInuk4GqoGL0a3c7HnItVWQAvhKfEsk3BJG', // 123456
  role: 'admin' as const,
};

export const funcionarioUser = {
  id: '00000000-0000-0000-0000-000000000002',
  name: 'João Silva',
  email: 'joao@taskflow.com',
  password: '$2b$10$ejofXdJkIItGG9ZdrPdInuk4GqoGL0a3c7HnItVWQAvhKfEsk3BJG', // 123456
  role: 'funcionario' as const,
};

export const mockedToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAwLTAwMDAtMDAwMDAwMDAwMDAwMSIsImVtYWlsIjoiYWRtaW5AdGFza2Zsb3cuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const loginDto: LoginDto = {
  email: 'admin@taskflow.com',
  password: '123456',
};

export const loginDtoFuncionario: LoginDto = {
  email: 'joao@taskflow.com',
  password: '123456',
};

export const registerDto: RegisterDto = {
  name: 'Novo Usuário',
  email: 'novo@taskflow.com',
  password: '123456',
  role: 'funcionario',
};

export const registerDtoAdmin: RegisterDto = {
  name: 'Novo Admin',
  email: 'novoadmin@taskflow.com',
  password: '123456',
  role: 'admin',
};

