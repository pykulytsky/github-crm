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
    const fetchedRepository = await this.service.fetchRepository(
      repoOwner,
      repoName,
    ); // TODO: error handling

    const newRepositoryInput = { ...fetchedRepository, userId };
    return await this.repo.create(newRepositoryInput);
  }
}
