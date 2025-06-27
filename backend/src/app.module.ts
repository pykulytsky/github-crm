import { Module } from '@nestjs/common';
import { GithubRepositoryModule } from './infrastructure/modules/github-repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), GithubRepositoryModule],
})
export class AppModule {}
