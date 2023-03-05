// 🐱 Nestjs imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// 🌏 Project imports
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { AuthModule } from '@auth/auth.module';

import { PostsModule } from '@posts/posts.module';

import { CommentsModule } from '@comments/comments.module';

import { UsersModule } from '@users/users.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeormConfigModule,
    PostsModule,
    CommentsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
