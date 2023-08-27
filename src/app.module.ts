import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PostModule } from '@src/api/post/post.module';
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { AuthModule } from '@auth/auth.module';

import { CommentModule } from '@comment/comment.module';

import { UserModule } from '@user/user.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeormConfigModule,
    PostModule,
    CommentModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
