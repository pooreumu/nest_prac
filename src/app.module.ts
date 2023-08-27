// 🐱 Nestjs imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// 🌏 Project imports
import { CommentsModule } from '@src/api/comment/comments.module';
import { PostModule } from '@src/api/post/post.module';
import { UsersModule } from '@src/api/user/users.module';
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { AuthModule } from '@auth/auth.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeormConfigModule,
    PostModule,
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
