import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
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
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @Post('')
  createPost(@Body() dto: postDto) {
    return this.postService.createPost(dto);
  }

  @Delete('')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }

  @Post('addjob/:id')
  addJob(@Param('id', ParseIntPipe) id: number, @Body() jobdto: jobDto) {
    return this.postService.addJob(id, jobdto);
  }
  @Get('myposts/:id')
  getMyPosts(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getMyPosts(id);
  }
}
