import {
  Body,
  Param,
  Controller,
  Get,
  Delete,
  Put,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req: any) {
    return req.user;
  }
}
