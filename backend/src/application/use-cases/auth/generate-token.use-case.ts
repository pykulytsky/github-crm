import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export interface Token {
  access_token: string;
}

@Injectable()
export class GenerateTokenUseCase {
  constructor(private readonly jwt: JwtService) {}

  async execute(user: User): Promise<Token> {
    const payload = { sub: user.id, email: user.email };
    return {
      // Since it is simple app, we can get along with just access token.
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
