import { Module } from '@nestjs/common';
import { GithubRepositoryModule } from './infrastructure/modules/github-repository';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/modules/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), GithubRepositoryModule, AuthModule],
})
export class AppModule {}
