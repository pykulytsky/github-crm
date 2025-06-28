import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/domain/entities/repository.entity';
import { IRepositoryRepository } from 'src/domain/repositories/repository.repository';
import { IRepositoryHostingService } from 'src/domain/services/repositories-hosting.service';

@Injectable()
export class AddRepositoryUseCase {
  constructor(
    @Inject('IRepositoryRepository')
    private readonly repo: IRepositoryRepository,

    @Inject('IRepositoryHostingService')
    private readonly service: IRepositoryHostingService,
  ) {}

  async execute(
    userId: string,
    repoOwner: string,
    repoName: string,
  ): Promise<Repository> {
    const existingRepository = await this.repo.findUnique(
      repoName,
      repoOwner,
      userId,
    );

    if (existingRepository) throw new Error('Repository already exists');

    const fetchedRepository = await this.service.fetchRepository(
      repoOwner,
      repoName,
    );

    if (!fetchedRepository) throw new Error('Could not fetch repository');

    const newRepositoryInput = { ...fetchedRepository, userId };
    try {
      return await this.repo.create(newRepositoryInput);
    } catch {
      throw new Error('Failed to add a repository');
    }
  }
}
