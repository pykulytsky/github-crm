import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import {
  CreateUserInput,
  IUserRepository,
} from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toDomainModel(user) : null;
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password: input.password,
      },
    });

    return this.toDomainModel(user);
  }

  toDomainModel(user: PrismaUser): User {
    return new User(user.id, user.email, user.password);
  }
}
