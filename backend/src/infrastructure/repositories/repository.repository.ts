import { Injectable } from '@nestjs/common';
import { Repository } from 'src/domain/entities/repository.entity';
import {
  CreateRepositoryInput,
  IRepositoryRepository,
  UpdateRepositoryInput,
} from 'src/domain/repositories/repository.repository';
import { Repository as PrismaRepository } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PrismaRepositoryRepository implements IRepositoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Array<Repository>> {
    const repositories = await this.prisma.repository.findMany({
      where: { userId },
    });

    return repositories.map((repository) => this.toDomainModel(repository));
  }

  async findById(id: number): Promise<Repository | null> {
    const repository = await this.prisma.repository.findFirst({
      where: { id },
    });

    return repository ? this.toDomainModel(repository) : null;
  }

  async create(input: CreateRepositoryInput): Promise<Repository> {
    const repository = await this.prisma.repository.create({
      data: {
        id: input.id,
        name: input.name,
        owner: input.owner,
        url: input.url,
        stars: input.stars,
        forks: input.forks,
        issues: input.issues,
        createdAt: input.createdAt,
        userId: input.userId,
      },
    });

    return this.toDomainModel(repository);
  }

  async update(
    id: number,
    userId: string,
    input: UpdateRepositoryInput,
  ): Promise<Repository | null> {
    try {
      const repository = await this.prisma.repository.update({
        where: { id_userId: { id, userId } },
        data: {
          id: input.id,
          name: input.name,
          owner: input.owner,
          url: input.url,
          stars: input.stars,
          forks: input.forks,
          issues: input.issues,
          createdAt: input.createdAt,
        },
      });

      return this.toDomainModel(repository);
    } catch (e) {
      return null;
    }
  }

  async delete(id: number, userId: string): Promise<Repository | null> {
    const repository = await this.prisma.repository.delete({
      where: { id_userId: { id, userId } },
    });
    return repository ? this.toDomainModel(repository) : null;
  }

  toDomainModel(repository: PrismaRepository): Repository {
    return new Repository(
      repository.id,
      repository.name,
      repository.owner,
      repository.url,
      repository.stars,
      repository.forks,
      repository.issues,
      repository.createdAt,
      repository.addedAt,
      repository.userId,
    );
  }
}
