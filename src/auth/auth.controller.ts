import { Body, Controller, Post } from '@nestjs/common';
import { authService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @Post('signUp')
  signup(@Body() dto: AuthDto) {
    return this.authService.signUp();
  }

  @Post('signIn')
  signIn() {
    return this.authService.signIn();
  }
}
