import { Controller, Post } from '@nestjs/common';
import { authService } from './auth.service';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @Post('signUp')
  signup() {
    return this.authService.signUp();
  }

  @Post('signIn')
  signIn() {
    return this.authService.signIn();
  }
}
