// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

// 📦 Package imports
import * as request from 'supertest';
import { DataSource } from 'typeorm';

// 🌏 Project imports
import { AppModule } from '../src/app.module';
import { ResponseEntity } from '../src/lib/response/ResponseEntity';
import { GetPostDto } from '../src/api/posts/dto/get-post.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    dataSource = app.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.synchronize(true);
    await app.close();
  });

  const posts = {
    title: 'test title',
    content: 'test content',
    authorId: 'ㅇㅇ',
    password: 'asdf1234',
  };

  it('게시글 생성 POST /posts', async () => {
    const res = await request(app.getHttpServer()).post('/posts').send(posts);
    expect(res.status).toBe(201);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('게시글 전체 조회 GET /posts', async () => {
    await Promise.all([
      request(app.getHttpServer()).post('/posts').send(posts),
      request(app.getHttpServer()).post('/posts').send(posts),
    ]);

    const res = await request(app.getHttpServer()).get('/posts');
    expect(res.status).toBe(200);

    const body: ResponseEntity<GetPostDto[]> = res.body;
    expect(body.statusCode).toBe('OK');

    const data = body.data;
    expect(data.length).toBe(3);
    expect(data[0].title).toBe(posts.title);
    expect(data[0].authorId).toBe(posts.authorId);
    expect(data[0].membership).toBe(false);
  });

  it('게시글 상세 조회 GET /posts/:boarId', async () => {
    const res = await request(app.getHttpServer()).get('/posts/1');
    expect(res.status).toBe(200);

    const body: ResponseEntity<GetPostDto> = res.body;
    expect(body.statusCode).toBe('OK');

    const data = body.data;
    expect(data.id).toBe(1);
    expect(data.title).toBe(posts.title);
    expect(data.content).toBe(posts.content);
    expect(data.authorId).toBe(posts.authorId);
    expect(data.membership).toBe(false);
  });

  it('게시글 업데이트 PATCH /posts/:boarId', async () => {
    const res = await request(app.getHttpServer())
      .patch('/posts/1')
      .send({ password: posts.password, title: 'update title' });
    expect(res.status).toBe(200);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('게시글 삭제 DELETE /posts/:boarId', async () => {
    const res = await request(app.getHttpServer())
      .delete('/posts/1')
      .set('password', `${posts.password}`);
    expect(res.status).toBe(200);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });
});
