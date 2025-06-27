import { Repository } from 'src/domain/entities/repository.entity';

export interface IRepositoryHostingService {
  fetchRepository(owner: string, name: string): Promise<Repository | null>;
}
