import { Body, Controller, Post, Req } from '@nestjs/common';
import { authService } from './auth.service';
import {
  CreateBusinessUserDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/user/dto';
import { Roles } from './roles.decorator';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  @Post('signUp')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('signUpBussiness')
  @Roles('Company')
  signUpBussiness(@Body() dto: CreateBusinessUserDto) {
    return this.authService.signUpBusiness(dto);
  }

  @Post('signIn')
  signIn(@Body() dto: LoginUserDto) {
    return this.authService.signIn(dto);
  }
}
