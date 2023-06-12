import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [PostsModule],
  providers: [PostsService],
})
export class AppModule {}
