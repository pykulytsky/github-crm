import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  async fetchUserRepositories(): Promise<Array<RepositoryDto>> {
    const userId = ''; // TODO: get it from request once auth is done

    return await this.fetchRepositoriesUseCase.executeForUser(userId);
  }

  @Version('1')
  @Post('')
  async addRepository(@Body() input: AddRepositoryDto): Promise<RepositoryDto> {
    const userId = ''; // TODO: get it from request once auth is done

    return await this.addRepositoryUseCase.execute(
      userId,
      input.owner,
      input.name,
    );
  }

  @Version('1')
  @Patch(':id')
  async updateRepository(@Param('id') id: string): Promise<RepositoryDto> {
    const userId = ''; // TODO: get it from request once auth is done
    return await this.updateRepositoryUseCase.execute(id, userId);
  }

  @Version('1')
  @Delete(':id')
  async deleteRepository(@Param('id') id: string): Promise<RepositoryDto> {
    const userId = ''; // TODO: get it from request once auth is done
    return await this.deleteRepositoryUseCase.execute(id, userId);
  }
}
