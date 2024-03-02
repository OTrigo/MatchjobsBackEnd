import { Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/';

@Injectable()
export class CompanyService {
  constructor() {}

  async getAll() {}

  async create(dto: CompanyDto) {}

  async getCompany(id: number) {}

  async update(id: number, dto: CompanyDto) {}

  async delete(id: number) {}
}
