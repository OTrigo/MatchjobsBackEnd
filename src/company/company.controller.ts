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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  @Get('')
  getAll() {
    return this.companyService.getAll();
  }

  @Get(':id')
  getCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.getCompany(id);
  }

  @Post('')
  create(@Body() dto: CompanyDto) {
    return this.companyService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CompanyDto) {
    return this.companyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.delete(id);
  }
}
