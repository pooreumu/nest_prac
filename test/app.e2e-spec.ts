// π± Nestjs imports
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

// π¦ Package imports
import session from 'express-session';
import passport from 'passport';
import request from 'supertest';
import { DataSource } from 'typeorm';

// π Project imports
import { AppModule } from '@src/app.module';

import { ResponseEntity } from '@lib/response/ResponseEntity';

import { GetPostDto } from '@posts/dto/get-post.dto';

import { GetCommentDto } from '@comments/dto/get-comment.dto';

import { User } from '@users/entities/user.entity';

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

    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
          httpOnly: true,
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

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
    authorId: 'γγ',
    password: 'asdf1234',
  };

  const comments = {
    post: 1,
    content: 'test content',
    authorId: 'γγ',
    password: 'asdf1234',
  };

  const updateComment = { content: 'update comment content' };

  it('κ²μκΈ μμ± POST /posts', async () => {
    const res = await request(app.getHttpServer()).post('/posts').send(posts);
    expect(res.status).toBe(201);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('λκΈ μμ± POST /comments', async () => {
    const res = await request(app.getHttpServer())
      .post('/comments')
      .send(comments);
    expect(res.status).toBe(201);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('λκΈ μλ°μ΄νΈ PUT /comments/:id', async () => {
    const res = await request(app.getHttpServer()).put('/comments/1').send({
      content: updateComment.content,
      password: comments.password,
    });
    expect(res.status).toBe(200);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('κ²μκΈ μ μ²΄ μ‘°ν GET /posts', async () => {
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
  });

  it('κ²μκΈ μμΈ μ‘°ν GET /posts/:boarId', async () => {
    const res = await request(app.getHttpServer()).get('/posts/1');
    expect(res.status).toBe(200);

    const body: ResponseEntity<GetPostDto> = res.body;
    expect(body.statusCode).toBe('OK');

    const data = body.data;
    expect(data.id).toBe(1);
    expect(data.title).toBe(posts.title);
    expect(data.content).toBe(posts.content);
    expect(data.authorId).toBe(posts.authorId);

    const dataComments: GetCommentDto[] = data.comments;
    expect(dataComments[0].authorId).toBe(comments.authorId);
    expect(dataComments[0].content).toBe(updateComment.content);
  });

  it('κ²μκΈ μλ°μ΄νΈ PATCH /posts/:boarId', async () => {
    const res = await request(app.getHttpServer())
      .patch('/posts/1')
      .send({ password: posts.password, title: 'update title' });
    expect(res.status).toBe(200);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('κ²μκΈ μ­μ  DELETE /posts/:boarId', async () => {
    const res = await request(app.getHttpServer())
      .delete('/posts/1')
      .set('password', `${posts.password}`);
    expect(res.status).toBe(200);

    const body: ResponseEntity<string> = res.body;
    expect(body.statusCode).toBe('OK');
  });

  it('νμκ°μ POST /users/sign-up', async () => {
    const user = {
      nickname: 'nickname',
      password: 'password',
    };
    const res = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send(user);

    expect(res.status).toBe(201);
  });

  it('λ‘κ·ΈμΈ POST /users/sign-in', async () => {
    const user = {
      nickname: 'nickname',
      password: 'password',
    };
    const res = await request(app.getHttpServer())
      .post('/users/sign-in')
      .send(user);

    expect(res.status).toBe(201);

    const body: User = res.body;
    expect(body.id).toBe(1);
    expect(body.nickname).toBe(user.nickname);

    const [connectSid] = res.headers['set-cookie'][0].split(' ');
    const [key] = connectSid.split('=');
    expect(key).toBe('connect.sid');
  });
});
