import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async executeByEmail(email: string): Promise<User> {
    const user = await this.repo.findByEmail(email);

    if (!user)
      throw new NotFoundException('Could not find use with given email');

    return user;
  }

  async executeById(id: string): Promise<User> {
    const user = await this.repo.findById(id);

    if (!user) throw new NotFoundException('Could not find use with given id');

    return user;
  }
}
