import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { verifyPassword } from './utils';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}
  async execute(email: string, password: string) {
    const user = await this.repo.findByEmail(email);

    if (!user)
      throw new NotFoundException('Could not find user with given email');

    const valid = await verifyPassword(password, user.password);

    if (!valid) throw new Error('Invalid password');

    // TODO: generate tokens
  }
}
