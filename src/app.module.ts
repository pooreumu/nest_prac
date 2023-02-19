// 🐱 Nestjs imports
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { PostsModule } from './api/posts/posts.module';
import typeormConfig from './configs/typeorm.config';
import { CommentsModule } from './api/comments/comments.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './api/users/users.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
