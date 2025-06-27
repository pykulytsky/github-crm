import { User } from '../entities/user.entity';

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}
