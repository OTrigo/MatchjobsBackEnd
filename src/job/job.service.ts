import { Injectable } from '@nestjs/common';
import { jobDto } from './dto';

@Injectable()
export class JobService {
  constructor() {}

  async getAll() {}

  async getJob(id: string) {}

  async createJob(dto: jobDto) {}

  async deleteJob(id: string) {}
}
