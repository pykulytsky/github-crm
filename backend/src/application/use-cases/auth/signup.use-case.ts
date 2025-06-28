import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { hashPassword } from './utils';
import { GenerateTokenUseCase } from './generate-token.use-case';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject('IUserRepository') private readonly repo: IUserRepository,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(email: string, password: string) {
    const hashedPassword = await hashPassword(password);

    try {
      const user = await this.repo.create({ email, password: hashedPassword });
      return await this.generateTokenUseCase.execute(user);
    } catch (e) {
      throw new Error('Failed to create an account, user already exists');
    }
  }
}
