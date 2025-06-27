import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/domain/entities/repository.entity';
import { IRepositoryRepository } from 'src/domain/repositories/repository.repository';

@Injectable()
export class DeleteRepositoryUseCase {
  constructor(
    @Inject('IRepositoryRepository')
    private readonly repo: IRepositoryRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Repository> {
    const repository = await this.repo.delete(id, userId);

    if (!repository)
      throw new NotFoundException('Could not delete repository with given id');

    return repository;
  }
}
