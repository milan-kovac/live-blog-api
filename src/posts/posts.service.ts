import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreatePostDto } from './dtos/create.post.dto';
import { Post } from './interfaces/post.interface';
import { LogMethod } from 'src/shared/decorators/log.method.decorator';
import { UpdatePostDto } from './dtos/update.post.dto';
import { PostsGateway } from './posts.gateway';

@Injectable()
export class PostsService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly postsGateway: PostsGateway,
  ) {}

  @LogMethod()
  async create(createPost: CreatePostDto): Promise<Post> {
    const [post] = (await this.knex('posts').returning(['id', 'title']).insert(createPost)) as Post[];
    this.postsGateway.broadcastNewPost(post);
    return post;
  }

  @LogMethod()
  async update(id: number, updatePost: UpdatePostDto): Promise<Post> {
    const [updatedPost] = await this.knex('posts').where({ id }).update(updatePost).returning(['id', 'title']);
    if (!updatedPost) {
      throw new BadRequestException('Please provide valid id.');
    }
    this.postsGateway.broadcastPostUpdate(updatedPost);
    return updatedPost;
  }

  @LogMethod()
  async getAll(): Promise<Post[]> {
    return await this.knex('posts').select('id', 'title');
  }
}
