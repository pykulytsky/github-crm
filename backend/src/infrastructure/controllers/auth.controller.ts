import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { LoginDto, SignupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  @Version('1')
  @Post('login')
  async login(@Body() input: LoginDto) {
    console.log(input);
  }

  @Version('1')
  @Post('signup')
  async signup(@Body() input: SignupDto) {
    console.log(input);
  }

  @Version('1')
  @Get('me')
  async me() {
    console.log('auth/me');
  }
}
