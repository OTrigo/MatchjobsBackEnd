import { Injectable } from '@nestjs/common';
import { postDto } from './dto';

@Injectable()
export class PostService {
  constructor() {}

  async getPosts() {}

  async getPost(id: number) {}

  async createPost(dto: postDto) {}

  async deletePost(id: number) {}
}
