// 🐱 Nestjs imports
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';
import { DataSource, Repository } from 'typeorm';

// 🌏 Project imports
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { PostModel, SelectPostModel } from '@posts/entities/post.model';

import { paginationSample } from '../../../test/data/post/pagination-sample';

import { Post } from './entities/post.entity';
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

  describe('게시글 작성: createPost', () => {
    it('PostRepository.createPost 실행 하면 this.posts.insert 실행 하나?', async () => {
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

  describe('게시글 전체 조회: getAllPosts', () => {
    describe('pagination 테스트', () => {
      it('size 만큼 가져옴?', async () => {
        const page = 1;
        const size = 3;
        await repository.insert(paginationSample);

        const [posts, totalCount] = await postsRepository.getPosts(
          new PostModel({ page, size }),
        );

        expect(posts.length).toBe(size);
        expect(totalCount).toBe(9);
      });

      it('page 만큼 건너뛰고 가져옴?', async () => {
        const size = 3;
        const page = 2;
        await repository.insert(paginationSample);

        const [posts, totalCount] = await postsRepository.getPosts(
          new PostModel({ page, size }),
        );

        expect(posts[0].id).toBe(6);
        expect(posts[1].id).toBe(5);
        expect(posts[2].id).toBe(4);
        expect(totalCount).toBe(9);
      });
    });

    describe('검색 테스트', () => {
      it('title에 검색어가 포함된 게시글만 가져옴?', async () => {
        const page = 1;
        const size = 3;
        const search = 'search';

        const postData = {
          title: search,
          content: 'content',
          authorId: 'author',
          password: 'password',
          createdAt: LocalDateTime.now(),
        };

        await repository.insert([
          ...paginationSample,
          Post.createPost(postData),
        ]);

        const [posts, totalCount] = await postsRepository.getPosts(
          new PostModel({ page, size, search }),
        );

        expect(totalCount).toBe(1);
        expect(posts[0].title).toBe(search);
      });

      it('content에 검색어가 포함된 게시글만 가져옴?', async () => {
        const page = 1;
        const size = 3;
        const search = 'search';

        const postData = {
          title: 'content에 검색어가 포함된 게시글만 가져옴?',
          content: search,
          authorId: 'author',
          password: 'password',
          createdAt: LocalDateTime.now(),
        };

        await repository.insert([
          ...paginationSample,
          Post.createPost(postData),
        ]);

        const [posts, totalCount] = await postsRepository.getPosts(
          new PostModel({ page, size, search }),
        );

        expect(totalCount).toBe(1);
        expect(posts[0].title).toBe(
          'content에 검색어가 포함된 게시글만 가져옴?',
        );
      });
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('PostRepository.getOnePost 실행 하면 this.posts.findOne 실행 하나?', async () => {
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

    it('게시 글이 없으면 NotFoundException 을 던지나?', async () => {
      const postId = 1;

      const select = SelectPostModel.selectPost();
      const wherePost = Post.byPk({ id: postId });

      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(async () => {
        return await postsRepository.getPost(wherePost, select);
      }).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('PostRepository.updatePost 실행 하면 this.posts.update 실행 하나?', async () => {
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

    it('수정이 안되면 ForbiddenException 던지나?', async () => {
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
    it('PostRepository.removePost 실행 하면 this.posts.delete 실행 하나?', async () => {
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

    it('삭제가 안되면 ForbiddenException 던지나?', async () => {
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
