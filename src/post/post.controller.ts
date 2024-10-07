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
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { postDto } from './dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { jobDto, selectJobDto } from 'src/job/dto';
import { AuthGuard } from '@nestjs/passport';

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
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  createPost(@Body() dto: postDto, @Req() req: any) {
    return this.postService.createPost(dto, req);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Post('addjob/:id')
  addJob(@Param('id') id: string, @Body() jobdto: selectJobDto) {
    return this.postService.addJob(id, jobdto);
  }

  @Get('myposts/:id')
  getMyPosts(@Param('id') id: string) {
    return this.postService.getMyPosts(id);
  }

  @Get('like/:id')
  likePost(@Param('id') id: string) {
    return this.postService.likePost(id);
  }

  @Get('dislike/:id')
  dislikePost(@Param('id') id: string) {
    return this.postService.dislikePost(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: postDto) {
    return this.postService.update(id, dto);
  }
}
