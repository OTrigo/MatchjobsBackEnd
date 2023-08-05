import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  signUp(@Body() dto: UserDto) {
    return this.userService.signUp(dto);
  }
  @Post('signIn')
  signIn(@Body() dto: UserDto) {
    return this.userService.signIn(dto);
  }
  @Get('')
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id : string) {
    return this.userService.getUser(id);
  }
}
