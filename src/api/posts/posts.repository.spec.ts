// ๐ฑ Nestjs imports
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// ๐ฆ Package imports
import { LocalDateTime } from '@js-joda/core';
import { DataSource, Repository } from 'typeorm';

// ๐ Project imports

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { Post } from './entities/post.entity';
import { OrderPostModel, SelectPostModel } from './entities/post.model';
import { PostsModule } from './posts.module';
import { PostsRepository } from './posts.repository';

describe('PostsRepository', () => {
  let postsRepository: PostsRepository;
  let repository: Repository<Post>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostsModule, TypeormConfigModule],
    }).compile();

    postsRepository = module.get<PostsRepository>(PostsRepository);
    repository = module.get<Repository<Post>>('PostRepository');
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postsRepository).toBeDefined();
  });

  describe('๊ฒ์๊ธ ์์ฑ: createPost', () => {
    it('PostRepository.createPost๋ฅผ ์คํํ๋ฉด this.posts.insert ์คํํ๋?', async () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';
      const createdAt = LocalDateTime.of(2023, 1, 19, 19, 19, 19);

      const post = Post.createPost({
        title,
        content,
        authorId,
        password,
        createdAt,
      });

      repository.insert = jest.fn();

      await postsRepository.createPost(post);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(post);
    });
  });

  describe('๊ฒ์๊ธ ์ ์ฒด ์กฐํ: getAllPosts', () => {
    it('PostRepository.getAllPosts ์คํํ๋ฉด this.posts.find ์คํํ๋?', async () => {
      const select = SelectPostModel.selectPostList();
      const order = OrderPostModel.orderPostList();

      repository.find = jest.fn();

      await postsRepository.getPosts(select, order);

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith({ select, order });
    });
  });

  describe('๊ฒ์๊ธ ์์ธ ์กฐํ: getOnePost', () => {
    it('PostRepository.getOnePost ์คํํ๋ฉด this.posts.findOne ์คํํ๋?', async () => {
      const postId = 1;

      const select = SelectPostModel.selectPost();
      const wherePost = Post.byPk({ id: postId });

      repository.findOne = jest.fn().mockResolvedValue(new Post());

      await postsRepository.getPost(wherePost, select);

      expect(repository.findOne).toBeCalledTimes(1);
      expect(repository.findOne).toBeCalledWith({
        where: { id: wherePost.id },
        select,
        relations: { comments: true },
      });
    });

    it('๊ฒ์๊ธ์ด ์์ผ๋ฉด NotFoundException์ ๋์ง๋?', async () => {
      const postId = 1;

      const select = SelectPostModel.selectPost();
      const wherePost = Post.byPk({ id: postId });

      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(async () => {
        return await postsRepository.getPost(wherePost, select);
      }).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('๊ฒ์๊ธ ์์ : updatePost', () => {
    it('PostRepository.updatePost ์คํํ๋ฉด this.posts.update ์คํํ๋?', async () => {
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

    it('์์ ์ด ์๋๋ฉด ForbiddenException์ ๋์ง๋?', async () => {
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

  describe('๊ฒ์๊ธ ์ญ์ : removePost', () => {
    it('PostRepository.removePost ์คํํ๋ฉด this.posts.delete ์คํํ๋?', async () => {
      const postId = 1;
      const password = 'password';

      const wherePost = Post.deleteBy({ id: postId, password });

      repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await postsRepository.removePost(wherePost);

      expect(repository.delete).toBeCalledTimes(1);
      expect(repository.delete).toBeCalledWith({
        id: wherePost.id,
        password: wherePost.password,
      });
    });

    it('์ญ์ ๊ฐ ์๋๋ฉด ForbiddenException์ ๋์ง๋?', async () => {
      const postId = 1;
      const password = 'password';

      const wherePost = Post.deleteBy({ id: postId, password });

      repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(async () => {
        await postsRepository.removePost(wherePost);
      }).rejects.toThrowError(new ForbiddenException());
    });
  });
});
