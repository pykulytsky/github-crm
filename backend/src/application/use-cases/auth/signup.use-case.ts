import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { hashPassword } from './utils';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
  ) {}

  async execute(email: string, password: string) {
    const hashedPassword = await hashPassword(password);

    const user = await this.repo.create({ email, password: hashedPassword });

    // TODO: generate tokens
    //
    return user;
  }
}
