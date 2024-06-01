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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  @Get('page/:amt')
  @Roles('Admin', 'User')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getPage(@Param('amt', ParseIntPipe) page: number) {
    return this.userService.getPage(page);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  @Get('')
  @Roles('Admin', 'User')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @Roles('Admin')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15000)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @Roles('Admin', 'User')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  // @Roles('Admin', 'User')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.userService.delete(id);
  }

  @Get('me')
  @Roles('User', 'Admin')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15000)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMe(@Req() req: any) {
    return req.user;
  }
}
