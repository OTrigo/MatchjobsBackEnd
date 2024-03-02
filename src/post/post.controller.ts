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

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
  getPosts() {
    return this.postService.getPosts();
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
}
