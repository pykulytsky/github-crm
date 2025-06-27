import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/domain/entities/repository.entity';
import { IRepositoryRepository } from 'src/domain/repositories/repository.repository';
import { IRepositoryHostingService } from 'src/domain/services/repositories-hosting.service';

@Injectable()
export class UpdateRepositoryUseCase {
  constructor(
    @Inject('IRepositoryRepository')
    private readonly repo: IRepositoryRepository,

    @Inject('IRepositoryHostingService')
    private readonly service: IRepositoryHostingService,
  ) {}

  async execute(id: number, userId: string): Promise<Repository> {
    const existingRepository = await this.repo.findById(id);

    if (!existingRepository)
      throw new NotFoundException(
        'Could not find repository with given repository id and userId',
      );

    const fetchedRepository = await this.service.fetchRepository(
      existingRepository.owner,
      existingRepository.name,
    ); // TODO: error handling

    return await this.repo.update(
      existingRepository.id,
      userId,
      fetchedRepository,
    );
  }
}
