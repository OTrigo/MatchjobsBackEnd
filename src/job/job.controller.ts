import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { JobService } from './job.service';
import { jobDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  getAll() {
    return this.jobService.getAll();
  }

  @Get(':id')
  getJob(@Param('id') id: string) {
    return this.jobService.getJob(id);
  }

  @Post('')
  createJob(@Body() dto: jobDto) {
    return this.jobService.createJob(dto);
  }

  @Delete('')
  deleteJob(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }
}
