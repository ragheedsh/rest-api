import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Posts } from './posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<Posts> = [];

  public findAll(): Array<Posts> {
    return this.posts;
  }

  public findOne(id: number): Posts {
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
}
