import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { PrismaService } from '../services/prisma.service';
import { GetUserUseCase } from 'src/application/use-cases/user/get-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { PrismaUserRepository } from '../repositories/user.repository';
import { GenerateTokenUseCase } from 'src/application/use-cases/auth/generate-token.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { SignupUseCase } from 'src/application/use-cases/auth/signup.use-case';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,

    { provide: 'IUserRepository', useClass: PrismaUserRepository },

    GetUserUseCase,
    GenerateTokenUseCase,
    LoginUseCase,
    SignupUseCase,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
