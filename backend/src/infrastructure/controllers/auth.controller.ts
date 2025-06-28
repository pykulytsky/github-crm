import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Version,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() input: LoginDto,
  ) {
    try {
      const { access_token } = await this.loginUseCase.execute(
        input.email,
        input.password,
      );
      response.cookie('access_token', `Bearer ${access_token}`, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
      return { access_token };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Version('1')
  @Public()
  @Post('signup')
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() input: SignupDto,
  ) {
    try {
      const { access_token } = await this.signupUseCase.execute(
        input.email,
        input.password,
      );
      response.cookie('access_token', `Bearer ${access_token}`, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
      return { access_token };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Version('1')
  @Get('me')
  async me(@Request() req: any) {
    return await this.getUserUserCase.executeById(req.user.sub);
  }

  @Version('1')
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', null);
    return { status: 'success' };
  }
}
