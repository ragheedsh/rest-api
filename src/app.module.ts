import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(
      'mongodb+srv://rshnnar:Meta123%40@cluster.t9hpaai.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostsService],
})
export class AppModule {}
