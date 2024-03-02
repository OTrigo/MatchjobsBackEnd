import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  signUp(@Body() dto: CreateUserDto) {
    return this.userService.signUp(dto);
  }
  @Post('signIn')
  signIn(@Body() dto: LoginUserDto) {
    return this.userService.signIn(dto);
  }
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  @Get('')
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
