// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { PostsModule } from './posts/posts.module';
import typeormConfig from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env`,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
