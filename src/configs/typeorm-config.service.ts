// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// 📦 Package imports
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const typeOrmModuleOptions: {
      dev: TypeOrmModuleOptions;
      test: TypeOrmModuleOptions;
      product: TypeOrmModuleOptions;
    } = {
      dev: {
        type: 'mysql',
        host: this.configService.get('RDS_HOSTNAME'),
        port: +this.configService.get('RDS_PORT'),
        username: this.configService.get('RDS_USERNAME'),
        password: this.configService.get('RDS_PASSWORD'),
        database: this.configService.get('RDS_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      test: {
        type: 'mysql',
        host: this.configService.get('RDS_TEST_HOSTNAME', '127.0.0.1'),
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
      },
      product: {
        type: 'mysql',
        host: this.configService.get('RDS_HOSTNAME'),
        port: +this.configService.get('RDS_PORT'),
        username: this.configService.get('RDS_USERNAME'),
        password: this.configService.get('RDS_PASSWORD'),
        database: this.configService.get('RDS_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
      },
    };
    return typeOrmModuleOptions[this.configService.get('NODE_ENV')];
  }
}
