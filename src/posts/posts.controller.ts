import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Posts } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll(): Array<Posts> {
    return this.postsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Posts {
    return this.postsService.findOne(id);
  }
}

//https://www.thisdot.co/blog/introduction-to-restful-apis-with-nestjs/
