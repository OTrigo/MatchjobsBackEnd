import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { jobDto } from 'src/job/dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('page/:amt')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  getPage(@Param('amt', ParseIntPipe) page: number) {
    return this.postService.getPage(page);
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.getPost(id);
  }

  @Post('')
  createPost(@Body() dto: postDto) {
    return this.postService.createPost(dto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Post('addjob/:id')
  addJob(@Param('id') id: string, @Body() jobdto: jobDto) {
    return this.postService.addJob(id, jobdto);
  }
  @Get('myposts/:id')
  getMyPosts(@Param('id') id: string) {
    return this.postService.getMyPosts(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: postDto) {
    return this.postService.update(id, dto);
  }
}
