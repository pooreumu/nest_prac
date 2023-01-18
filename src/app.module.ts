// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { BoardsModule } from './boards/boards.module';
import typeormConfig from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env`,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
