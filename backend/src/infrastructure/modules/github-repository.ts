import { Module } from '@nestjs/common';
import { GithubRepositoryController } from '../controllers/github-repository';
import { FetchRepositoriesUseCase } from 'src/application/use-cases/repository/fetch-repositories.use-case';
import { AddRepositoryUseCase } from 'src/application/use-cases/repository/add-repository.user-case';
import { UpdateRepositoryUseCase } from 'src/application/use-cases/repository/update-repository.use-case';
import { DeleteRepositoryUseCase } from 'src/application/use-cases/repository/delete-repository.use-case';
import { PrismaService } from '../services/prisma.service';
import { PrismaRepositoryRepository } from '../repositories/repository.repository';
import { GithubService } from '../services/github.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [GithubRepositoryController],
  providers: [
    PrismaService,
    ConfigService,

    { provide: 'IRepositoryRepository', useClass: PrismaRepositoryRepository },
    { provide: 'IRepositoryHostingService', useClass: GithubService },

    FetchRepositoriesUseCase,
    AddRepositoryUseCase,
    UpdateRepositoryUseCase,
    DeleteRepositoryUseCase,
  ],
})
export class GithubRepositoryModule {}
