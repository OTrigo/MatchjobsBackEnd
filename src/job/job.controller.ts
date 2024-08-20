import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service';
import { jobDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

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
  getJob(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobService.getJob(id);
  }

  @Post('')
  @Roles('Company', 'Recruiter', 'Admin')
  createJob(@Body() dto: jobDto) {
    return this.jobService.createJob(dto);
  }

  @Roles('Company', 'Recruiter', 'Admin')
  @Delete(':id')
  deleteJob(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobService.deleteJob(id);
  }

  /*
  @Post('portifolio/:id')
  sendPortifolio(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userdto: UserDto,
  ) {
    return this.jobService.sendPortifolio(id, userdto);
  }
  */

  @Roles('User', 'Admin')
  @Post('apply/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  applyToJob(@Param('id') id: string, @Req() req: any) {
    return this.jobService.applyToJob(id, req.user);
  }

  @Roles('Company', 'Recruiter', 'Admin', 'User')
  @Get('/company/:id')
  getCompany(@Param('id') id: string) {
    return this.jobService.getCompany(id);
  }

  @Get('/candidates/:id')
  getCandidates(@Param('id') id: string) {
    return this.jobService.getCandidates(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: jobDto) {
    return this.jobService.update(id, dto);
  }
}
