import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { JobService } from './job.service';
import { jobDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UserDto } from 'src/user/dto';

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
  getJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.getJob(id);
  }

  @Post('')
  createJob(@Body() dto: jobDto) {
    return this.jobService.createJob(dto);
  }

  @Delete(':id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.deleteJob(id);
  }

  @Post('portifolio/:id')
  sendPortifolio(
    @Param('id', ParseIntPipe) id: number,
    @Body() userdto: UserDto,
  ) {
    return this.jobService.sendPortifolio(id, userdto);
  }
  @Get('/company/:id')
  getCompany(
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.jobService.getCompany(id)
  }
  @Get('/candidates/:id')
  getCandidates(
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.jobService.getCandidates(id)
  }
  
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: jobDto){
    return this.jobService.update(id,dto)
  }

}
