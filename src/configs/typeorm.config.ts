import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
  },
  test: {
    type: 'postgres',
    host: process.env.RDS_TEST_HOSTNAME,
    port: Number(process.env.RDS_TEST_PORT),
    username: process.env.RDS_TEST_USERNAME,
    password: process.env.RDS_TEST_PASSWORD,
    database: process.env.RDS_TEST_DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
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
  },
});
