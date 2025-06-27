import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async executeByEmail(email: string): Promise<User> {
    const user = await this.repo.findByEmail(email);

    if (!user) throw new NotFoundException('Could not find use with given id');

    return user;
  }
}
