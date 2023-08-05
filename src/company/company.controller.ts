import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private companyService : CompanyService) {}
    
    @Get('')
    getAll() {
        return this.companyService.getAll();
  }
}
