import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RDS_HOSTNAME,
      port: Number(process.env.RDS_PORT),
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    }),
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
