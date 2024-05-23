import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  @Get('')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAll() {
    return this.companyService.getAll();
  }

  @Get(':id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.getCompany(id);
  }

  @Post('')
  @Roles('Company', 'Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() dto: CompanyDto) {
    return this.companyService.create(dto);
  }

  @Put(':id')
  @Roles('Company', 'Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CompanyDto) {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.delete(id);
  }

  @Get('me')
  @Roles('Company')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15000)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMe(@Req() req: any) {
    return req.user;
  }
}
