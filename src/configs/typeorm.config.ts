// 🐱 Nestjs imports
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 📦 Package imports
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default (): {
  dev: TypeOrmModuleOptions;
  test: TypeOrmModuleOptions;
  product: TypeOrmModuleOptions;
} => ({
  dev: {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  },
  test: {
    type: 'mysql',
    host: process.env.RDS_TEST_HOSTNAME || '127.0.0.1',
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
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  },
});
