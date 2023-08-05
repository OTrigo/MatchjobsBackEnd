import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
    constructor(private jobService : JobService) {}

    @Get('')
    getAll() {
        return this.jobService.getAll();
    }
}
