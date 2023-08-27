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
        host: this.configService.get('DB_HOST'),
        port: +this.configService.get('DB_PORT'),
        username: this.configService.get('DB_USERNAME'),
        password: this.configService.get('DB_PASSWORD'),
        database: this.configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      test: {
        type: 'mysql',
        host: this.configService.get('TEST_DB_HOST', 'db'),
        port: 3306,
        username: this.configService.get('TEST_DB_USERNAME', 'test'),
        password: this.configService.get('TEST_DB_PASSWORD', 'test'),
        database: this.configService.get('TEST_DB_DATABASE', 'test'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        logging: false,
        dropSchema: true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      product: {
        type: 'mysql',
        host: this.configService.get('DB_HOST'),
        port: +this.configService.get('DB_PORT'),
        username: this.configService.get('DB_USERNAME'),
        password: this.configService.get('DB_PASSWORD'),
        database: this.configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
      },
    };

    return typeOrmModuleOptions[
      this.configService.get('NODE_ENV', 'dev') as 'dev' | 'test' | 'product'
    ];
  }
}
