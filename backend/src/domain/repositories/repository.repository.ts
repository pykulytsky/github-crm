import { Repository } from '../entities/repository.entity';

export interface IRepositoryRepository {
  findByUserId(userId: string): Promise<Array<Repository>>;
}
