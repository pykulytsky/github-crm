import { Repository } from '../entities/repository.entity';

export interface CreateRepositoryInput {
  id: number;
  name: string;
  owner: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: Date;
  userId: string;
}

export interface UpdateRepositoryInput
  extends Partial<Omit<CreateRepositoryInput, 'userId'>> {}

export interface IRepositoryRepository {
  findByUserId(userId: string): Promise<Array<Repository>>;
  findById(id: number): Promise<Repository | null>;
  findUnique(
    name: string,
    owner: string,
    userId: string,
  ): Promise<Repository | null>;
  create(input: CreateRepositoryInput): Promise<Repository>;
  update(
    id: number,
    userId: string,
    input: UpdateRepositoryInput,
  ): Promise<Repository | null>;
  delete(id: number, userId: string): Promise<Repository | null>;
}
