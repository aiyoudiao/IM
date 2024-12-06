import { Body, Controller, Post } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@purple/contracts';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(@Body() dto: AccountRegister.Request) {}

  @Post('login')
  async login(@Body() { email, password }: AccountLogin.Request) {}
}

/* Наше АПИ будет проксирвать запросы */
