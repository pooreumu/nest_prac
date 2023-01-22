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
    type: 'postgres',
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
    type: 'postgres',
    host: process.env.RDS_TEST_HOSTNAME || 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  },
  product: {
    type: 'postgres',
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
