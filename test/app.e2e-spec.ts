// 🐱 Nestjs imports
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// 📦 Package imports
import request from 'supertest';
import { DataSource } from 'typeorm';

// 🌏 Project imports
import { GetCommentDto } from '@src/api/comment/dto/get-comment.dto';
import { Comment } from '@src/api/comment/entities/comment.entity';
import { GetPostDto } from '@src/api/post/dto/get-post.dto';
import { PageDto } from '@src/api/post/dto/page.dto';
import { Post } from '@src/api/post/entities/post.entity';
import { User } from '@src/api/user/entities/user.entity';
import { AppModule } from '@src/app.module';

import { setNestApp } from '@lib/common/set-nest-app';
import { ResponseEntity } from '@lib/response/response-entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setNestApp(app);

    await app.init();

    dataSource = app.get<DataSource>(DataSource);
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.synchronize(true);
    await app.close();
  });

  describe('로그인이 필요한 API', () => {
    let agent: request.SuperTest<request.Test>;
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/users/sign-up').send({
        nickname: 'nickname',
        password: 'password',
      });

      agent = request.agent(app.getHttpServer());

      await agent.post('/users/sign-in').send({
        nickname: 'nickname',
        password: 'password',
      });
    });

    it('게시글 생성 POST /posts', async () => {
      const res = await agent.post('/posts').send({
        title: 'title',
        content: 'content',
      });
      expect(res.status).toBe(201);

      const body: ResponseEntity<string> = res.body;
      expect(body.statusCode).toBe('OK');
    });

    describe('게시글이 있어야 하는 API', () => {
      let post: Post;

      beforeEach(async () => {
        const postEntity = Post.createPost({
          title: 'title',
          content: 'content',
          userId: 1,
        });

        post = await dataSource.getRepository(Post).save(postEntity);
      });

      it('댓글 생성 POST /posts/:postId/comments', async () => {
        const res = await agent
          .post(`/posts/${post.id}/comments`)
          .send({ content: 'comment content' });

        expect(res.status).toBe(201);

        const body: ResponseEntity<string> = res.body;
        expect(body.statusCode).toBe('OK');
      });

      it('댓글 업데이트 PUT /posts/:postId/comments/:id', async () => {
        const commentEntity = Comment.createComment({
          content: 'comment content',
          userId: 1,
          postId: post.id,
        });

        const comment = await dataSource
          .getRepository(Comment)
          .save(commentEntity);

        const res = await agent
          .put(`/posts/${post.id}/comments/${comment.id}`)
          .send({
            content: 'update comment content',
          });
        expect(res.status).toBe(200);

        const body: ResponseEntity<string> = res.body;
        expect(body.statusCode).toBe('OK');
      });

      it('게시글 업데이트 PATCH /posts/:postId', async () => {
        const res = await agent
          .patch(`/posts/${post.id}`)
          .send({ title: 'update title' });
        expect(res.status).toBe(200);

        const body: ResponseEntity<string> = res.body;
        expect(body.statusCode).toBe('OK');
      });

      it('게시글 삭제 DELETE /posts/:postId', async () => {
        const res = await agent.delete(`/posts/${post.id}`);
        expect(res.status).toBe(200);

        const body: ResponseEntity<string> = res.body;
        expect(body.statusCode).toBe('OK');
      });
    });
  });

  describe('회원이 필요한 API', () => {
    let user: User;
    let post1: Post;
    let post2: Post;

    beforeEach(async () => {
      const userEntity = await User.from('nickname', 'password');

      user = await dataSource.getRepository(User).save(userEntity);

      const postEntity1 = Post.createPost({
        title: 'title1',
        content: 'content1',
        userId: user.id,
      });

      const postEntity2 = Post.createPost({
        title: 'title2',
        content: 'content2',
        userId: user.id,
      });

      [post1, post2] = await Promise.all([
        dataSource.getRepository(Post).save(postEntity1),
        dataSource.getRepository(Post).save(postEntity2),
      ]);
    });

    it('게시글 전체 조회 GET /posts', async () => {
      const res = await request(app.getHttpServer()).get('/posts');
      expect(res.status).toBe(200);

      const body: ResponseEntity<PageDto<GetPostDto>> = res.body;
      expect(body.statusCode).toBe('OK');

      const data = body.data;
      expect(data.totalPages).toBe(1);
      expect(data.items[0].title).toBe(post2.title);
    });

    it('게시글 상세 조회 GET /posts/:postId', async () => {
      const commentEntity = Comment.createComment({
        content: 'comment content',
        userId: user.id,
        postId: post1.id,
      });

      const comment = await dataSource
        .getRepository(Comment)
        .save(commentEntity);

      const res = await request(app.getHttpServer()).get(`/posts/${post1.id}`);
      expect(res.status).toBe(200);

      const body: ResponseEntity<GetPostDto> = res.body;
      expect(body.statusCode).toBe('OK');

      const data = body.data;
      expect(data.id).toBe(1);
      expect(data.title).toBe(post1.title);
      expect(data.content).toBe(post1.content);

      const dataComments: GetCommentDto[] = data.comments;
      expect(dataComments[0].content).toBe(comment.content);
    });
  });

  it('회원가입 POST /users/sign-up', async () => {
    const user = {
      nickname: 'nickname',
      password: 'password',
    };
    const res = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send(user);

    expect(res.status).toBe(201);
  });

  it('로그인 POST /users/sign-in', async () => {
    const user = {
      nickname: 'nickname',
      password: 'password',
    };

    await request(app.getHttpServer()).post('/users/sign-up').send(user);
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
