import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService : PostService){}

    @Get('')
    getPosts() {
        return this.postService.getPosts();
    }

    @Get(':id')
    getPost(@Param('id') id : string) {
        return this.postService.getPost(id);
    }
}
