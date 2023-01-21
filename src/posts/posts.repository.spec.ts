// 🐱 Nestjs imports
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { PostsModule } from './posts.module';
import { PostsRepository } from './posts.repository';
import { Post } from './entities/post.entity';
import { OrderPostModel, SelectPostModel } from './entities/post.model';
import typeormConfig from '../configs/typeorm.config';

describe('PostsRepository', () => {
  let postsRepository: PostsRepository;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostsModule,
        TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
      ],
    }).compile();

    postsRepository = module.get<PostsRepository>(PostsRepository);
    repository = module.get('PostRepository');
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await repository.query('TRUNCATE post RESTART IDENTITY');
  });

  it('should be defined', () => {
    expect(postsRepository).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('BoardsRepository.createPost를 실행하면 this.posts.insert 실행하나?', async () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';
      const membership = false;
      const createdAt = LocalDateTime.of(2023, 1, 19, 19, 19, 19);

      const board = Post.createPost({
        title,
        content,
        authorId,
        membership,
        password,
        createdAt,
      });

      repository.insert = jest.fn();

      await postsRepository.createPost(board);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(board);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('BoardsRepository.getAllPosts 실행하면 this.posts.find 실행하나?', async () => {
      const select = SelectPostModel.selectPostList();
      const order = OrderPostModel.orderPostList();

      repository.find = jest.fn();

      await postsRepository.getPosts(select, order);

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith({ select, order });
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('BoardsRepository.getOnePost 실행하면 this.posts.findOne 실행하나?', async () => {
      const postId = 1;

      const select = SelectPostModel.selectPost();
      const whereBoard = Post.byPk({ id: postId });

      repository.findOne = jest.fn().mockResolvedValue(new Post());

      await postsRepository.getPost(whereBoard, select);

      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith({
        where: { id: whereBoard.id },
        select,
      });
    });

    it('게시글이 없으면 NotFoundException을 던지나?', async () => {
      const postId = 1;

      const select = SelectPostModel.selectPost();
      const whereBoard = Post.byPk({ id: postId });

      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(async () => {
        return await postsRepository.getPost(whereBoard, select);
      }).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('BoardsRepository.updatePost 실행하면 this.posts.update 실행하나?', async () => {
      const postId = 1;
      const password = 'password';
      const title = 'update title';
      const updatedAt = LocalDateTime.of(2023, 1, 20, 19, 19, 19);

      const { wherePost, updatePost } = Post.updatePost({
        postId,
        password,
        title,
        updatedAt,
      });

      repository.update = jest.fn().mockResolvedValue({ affected: 1 });

      await postsRepository.updatePost(wherePost, updatePost);

      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(
        { id: wherePost.id, password: wherePost.password },
        updatePost,
      );
    });

    it('수정이 안되면 ForbiddenException을 던지나?', async () => {
      const postId = 1;
      const password = 'password';
      const title = 'update title';
      const updatedAt = LocalDateTime.of(2023, 1, 20, 19, 19, 19);

      const { wherePost, updatePost } = Post.updatePost({
        postId,
        title,
        password,
        updatedAt,
      });

      repository.update = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(async () => {
        await postsRepository.updatePost(wherePost, updatePost);
      }).rejects.toThrowError(new ForbiddenException());
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('BoardsRepository.removePost 실행하면 this.posts.delete 실행하나?', async () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = Post.deleteBy({ id: postId, password });

      repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await postsRepository.removePost(whereBoard);

      expect(repository.delete).toBeCalledTimes(1);
      expect(repository.delete).toBeCalledWith({
        id: whereBoard.id,
        password: whereBoard.password,
      });
    });

    it('삭제가 안되면 ForbiddenException을 던지나?', async () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = Post.deleteBy({ id: postId, password });

      repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(async () => {
        await postsRepository.removePost(whereBoard);
      }).rejects.toThrowError(new ForbiddenException());
    });
  });
});
