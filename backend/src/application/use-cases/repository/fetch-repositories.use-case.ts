import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/domain/entities/repository.entity';
import { IRepositoryRepository } from 'src/domain/repositories/repository.repository';

@Injectable()
export class FetchRepositoriesUseCase {
  constructor(
    @Inject('IRepositoryRepository')
    private readonly repo: IRepositoryRepository,
  ) {}

  async executeForUser(userId: string): Promise<Array<Repository>> {
    const repositories = await this.repo.findByUserId(userId);

    return repositories;
  }
}
