import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/exceptions/exception.filter';
import { Posts } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
@UseFilters(new HttpExceptionFilter())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public findAll(): Promise<Posts[]> {
    Logger.log('Posts retrieved successfully', this.postsService.findAllDB());
    return this.postsService.findAllDB();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public findOne(@Param('id', ParseIntPipe) id: number): Posts {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: Posts): Posts {
    return this.postsService.create(post);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: Posts,
  ): Posts {
    return this.postsService.update(id, post);
  }
}

//https://www.thisdot.co/blog/introduction-to-restful-apis-with-nestjs/
