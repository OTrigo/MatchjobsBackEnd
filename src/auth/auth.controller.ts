import { Body, Controller, Post } from '@nestjs/common';
import { authService } from './auth.service';
import { AuthDto } from './dto';
import { CreateUserDto, LoginUserDto } from 'src/user/dto';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @Post('signUp')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  signIn(@Body() dto: LoginUserDto) {
    return this.authService.signIn(dto);
  }
}
