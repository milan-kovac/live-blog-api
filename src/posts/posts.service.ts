import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreatePostDto } from './dtos/create.post.dto';
import { Post } from './interfaces/post.interface';
import { LogMethod } from 'src/shared/decorators/log.method.decorator';
import { UpdatePostDto } from './dtos/update.post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @LogMethod()
  async create(createPost: CreatePostDto): Promise<Post> {
    const [post] = (await this.knex('posts').returning('*').insert(createPost)) as Post[];
    return post;
  }

  @LogMethod()
  async update(id: number, updatePost: UpdatePostDto): Promise<Post> {
    const [updatedPost] = await this.knex('posts').where({ id }).update(updatePost).returning(['*']);
    if (!updatedPost) {
      throw new BadRequestException('Please provide valid id.');
    }
    return updatedPost;
  }

  @LogMethod()
  async getAll(): Promise<Post[]> {
    return await this.knex('posts').select('*');
  }
}
