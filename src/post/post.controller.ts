import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
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
