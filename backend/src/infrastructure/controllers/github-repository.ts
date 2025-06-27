import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Version,
} from '@nestjs/common';
import { AddRepositoryDto, RepositoryDto } from '../dtos/repository.dto';
import { FetchRepositoriesUseCase } from 'src/application/use-cases/repository/fetch-repositories.use-case';
import { UpdateRepositoryUseCase } from 'src/application/use-cases/repository/update-repository.use-case';
import { DeleteRepositoryUseCase } from 'src/application/use-cases/repository/delete-repository.use-case';
import { AddRepositoryUseCase } from 'src/application/use-cases/repository/add-repository.user-case';

@Controller('github-repositories')
export class GithubRepositoryController {
  constructor(
    private readonly fetchRepositoriesUseCase: FetchRepositoriesUseCase,
    private readonly addRepositoryUseCase: AddRepositoryUseCase,
    private readonly updateRepositoryUseCase: UpdateRepositoryUseCase,
    private readonly deleteRepositoryUseCase: DeleteRepositoryUseCase,
  ) {}

  @Version('1')
  @Get('')
  async fetchUserRepositories(
    @Request() req: any,
  ): Promise<Array<RepositoryDto>> {
    return await this.fetchRepositoriesUseCase.executeForUser(req.user.sub);
  }

  @Version('1')
  @Post('')
  async addRepository(
    @Request() req: any,
    @Body() input: AddRepositoryDto,
  ): Promise<RepositoryDto> {
    return await this.addRepositoryUseCase.execute(
      req.user.sub,
      input.owner,
      input.name,
    );
  }

  @Version('1')
  @Patch(':id')
  async updateRepository(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<RepositoryDto> {
    return await this.updateRepositoryUseCase.execute(Number(id), req.user.sub);
  }

  @Version('1')
  @Delete(':id')
  async deleteRepository(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<RepositoryDto> {
    return await this.deleteRepositoryUseCase.execute(Number(id), req.user.sub);
  }
}
