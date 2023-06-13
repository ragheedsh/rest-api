import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { Posts } from './posts.interface';
import { faker } from '@faker-js/faker';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  private posts: Array<Posts> = [
    {
      title: faker.music.songName(),
      category: faker.music.genre(),
      body: faker.image.url(),
      date: faker.date.anytime(),
      id: 0,
    },
  ];
  private readonly logger = new Logger(PostsService.name);

  async findAllDB(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  public findAll(): Array<Posts> {
    this.logger.log('Returning all posts');
    return this.posts;
  }

  public findOne(id: number): Posts {
    this.logger.log(`Returning all posts with id: ${id}`);

    const post: Posts = this.posts.find((posts) => posts.id === id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  public create(post: Posts): Posts {
    // if the title is already in use by another post
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    // find the next id for a new blog post
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: Posts = {
      ...post,
      id,
    };

    this.posts.push(blogPost);

    return blogPost;
  }

  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(index, 1);
  }

  public update(id: number, post: Posts): Posts {
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    // if the title is already in use by another post
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== id,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: Posts = {
      ...post,
      id,
    };
    this.posts[index] = blogPost;

    return blogPost;
  }
}
