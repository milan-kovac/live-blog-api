import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create.post.dto';
import { CreateGenericResponse } from 'src/shared/responses/create.response';
import { UpdatePostDto } from './dtos/update.post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPost: CreatePostDto) {
    const post = await this.postsService.create(createPost);
    return CreateGenericResponse(post);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePost: UpdatePostDto) {
    const post = await this.postsService.update(id, updatePost);
    return CreateGenericResponse(post);
  }

  @Get()
  async getAll() {
    const posts = await this.postsService.getAll();
    return CreateGenericResponse(posts);
  }
}
