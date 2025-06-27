import { Module } from '@nestjs/common';
import { GithubRepositoryController } from '../controllers/github-repository';

@Module({
  controllers: [GithubRepositoryController],
})
export class GithubRepositoryModule {}
