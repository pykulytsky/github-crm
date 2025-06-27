import { Injectable } from '@nestjs/common';
import { verifyPassword } from './utils';
import { GetUserUseCase } from '../user/get-user.use-case';
import { GenerateTokenUseCase } from './generate-token.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.getUserUseCase.executeByEmail(email);

    const valid = await verifyPassword(password, user.password);

    if (!valid) throw new Error('Invalid password');

    return await this.generateTokenUseCase.execute(user);
  }
}
