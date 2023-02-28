// 🐱 Nestjs imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { AuthModule } from '@auth/auth.module';

import { PostsModule } from '@posts/posts.module';

import { CommentsModule } from '@comments/comments.module';

import { UsersModule } from '@users/users.module';

import typeormConfig from './configs/typeorm.config';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env`,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
    PostsModule,
    CommentsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
