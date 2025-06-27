import { Repository } from 'src/domain/entities/repository.entity';

// It is highly likely that app like this could fetch repositories
// not only from Github but also from other platforms like Gitlab, Bitbucket etc.
// so i made it as a interface so in the future all the services for platforms
// mentioned above would implement this interface.
export interface IRepositoryHostingService {
  fetchRepository(owner: string, name: string): Promise<Repository | null>;
}
