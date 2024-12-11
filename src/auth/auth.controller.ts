import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
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
  @Roles('Company', 'Admin')
  signUpBussiness(@Body() dto: CreateBusinessUserDto) {
    return this.authService.signUpBusiness(dto);
  }

  @Post('signIn')
  signIn(@Body() dto: LoginUserDto) {
    return this.authService.signIn(dto);
  }

  @Get('redirectLinkedin')
  @Redirect()
  signUpLinkedin(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return this.authService.signUpLinkedin(req, res, query);
  }

  @Post('createAccountLinkedin')
  createAccountLinkedin(@Body() body: any) {
    return this.authService.createAccountLinkedin(body);
  }
}
