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
  Post,
} from '@nestjs/common';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';
import { UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CompanyDto } from 'src/company/dto';

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
  @Roles('Admin', 'User', 'Company')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15000)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @Roles('Admin', 'User', 'Recruiter')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @Roles('Admin', 'User')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    return this.userService.delete(id);
  }

  @Get('me')
  @Roles('User', 'Admin', 'Recruiter', 'Company')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15000)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMe(@Req() req: any) {
    return req.user;
  }

  @Post('bussiness/:id')
  @Roles('Company', 'Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  addRecruiterUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CompanyDto,
  ) {
    return this.userService.addRecruiterUser(id, dto);
  }
}
