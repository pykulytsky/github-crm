import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Version,
  Request,
} from '@nestjs/common';
import { LoginDto, SignupDto } from '../dtos/auth.dto';
import { GetUserUseCase } from 'src/application/use-cases/user/get-user.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { SignupUseCase } from 'src/application/use-cases/auth/signup.use-case';
import { Public } from '../auth/types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signupUseCase: SignupUseCase,
    private readonly getUserUserCase: GetUserUseCase,
  ) {}

  @Version('1')
  @Public()
  @Post('login')
  async login(@Body() input: LoginDto) {
    try {
      return await this.loginUseCase.execute(input.email, input.password);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Version('1')
  @Public()
  @Post('signup')
  async signup(@Body() input: SignupDto) {
    try {
      return await this.signupUseCase.execute(input.email, input.password);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Version('1')
  @Get('me')
  async me(@Request() req: any) {
    return await this.getUserUserCase.executeById(req.user.sub);
  }
}
