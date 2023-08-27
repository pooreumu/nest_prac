import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LocalDateTime } from '@js-joda/core';
import { DataSource, Repository } from 'typeorm';

import { PostModel } from '@src/api/post/entities/post.model';
import { User } from '@src/api/user/entities/user.entity';
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import {
  POST_REPOSITORY,
  PostRepository,
} from '@post/repository/post.repository';

import { paginationSample } from '../../../../test/data/post/pagination-sample';
import { Post } from '../entities/post.entity';
import { PostModule } from '../post.module';

describe('PostsRepository', () => {
  let module: TestingModule;
  let postsRepository: PostRepository;
  let repository: Repository<Post>;
  let dataSource: DataSource;
  let user: User;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PostModule, TypeormConfigModule],
    }).compile();

    postsRepository = module.get<PostRepository>(POST_REPOSITORY);
    repository = module.get<Repository<Post>>('PostRepository');
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
    jest.clearAllMocks();

    user = await dataSource
      .getRepository(User)
      .save(await User.from('nickname', 'password'));
  });

  afterEach(async () => {
    await module.close();
  });

  afterAll(async () => {
    await dataSource.synchronize(true);
  });

  it('should be defined', () => {
    expect(postsRepository).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('게시글 작성은 데이터베이스에 데이터를 저장할 수 있어야 한다.', async () => {
      const title = 'title';
      const content = 'content';

      const post = await postsRepository.createPost(
        Post.createPost({
          title,
          content,
          userId: user.id,
        }),
      );

      expect(post.title).toBe(title);
      expect(post.content).toBe(content);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    describe('pagination 테스트', () => {
      it('size 만큼 가져옴?', async () => {
        const page = 1;
        const size = 3;

        await repository.insert(paginationSample(user.id));
        const [posts, totalCount] = await postsRepository.getPosts(
          new PostModel({ page, size }),
        );

        expect(posts.length).toBe(size);
        expect(totalCount).toBe(9);
      });

      it('page 만큼 건너뛰고 가져옴?', async () => {
        const size = 3;
        const page = 2;
        await repository.insert(paginationSample(user.id));

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
          userId: user.id,
          createdAt: LocalDateTime.now(),
        };

        await repository.insert([
          ...paginationSample(user.id),
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
          userId: user.id,
          createdAt: LocalDateTime.now(),
        };

        await repository.insert([
          ...paginationSample(user.id),
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
    it('PostTypeormRepository.getOnePost 실행 하면 this.posts.findOne 실행 하나?', async () => {
      const postId = 1;

      repository.findOneOrFail = jest.fn().mockResolvedValue(new Post());

      await postsRepository.getPost(postId);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith({
        select: {
          userId: true,
          comments: {
            userId: true,
            content: true,
            createdAt: true,
            id: true,
            updatedAt: true,
          },
          content: true,
          createdAt: true,
          id: true,
          title: true,
          updatedAt: true,
        },
        where: {
          id: postId,
        },
        relations: {
          comments: true,
        },
      });
    });

    it('게시 글이 없으면 NotFoundException 을 던지나?', async () => {
      const postId = 1;

      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(async () => {
        return await postsRepository.getPost(postId);
      }).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('PostTypeormRepository.updatePost 실행 하면 this.posts.update 실행 하나?', async () => {
      const post1 = await repository.save(
        Post.createPost({
          title: 'title',
          content: 'content',
          userId: user.id,
        }),
      );

      const title = 'update title';
      await postsRepository.updatePost(
        Post.updatePost({
          postId: post1.id,
          userId: user.id,
          title: title,
        }),
      );

      const post = await repository.findOneOrFail({
        where: {
          id: post1.id,
        },
      });
      expect(post.title).toBe(title);
    });

    describe('게시글 삭제: removePost', () => {
      it('PostTypeormRepository.removePost 실행 하면 this.posts.delete 실행 하나?', async () => {
        const postId = 1;

        const wherePost = Post.deleteBy({ id: postId, userId: user.id });

        repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

        await postsRepository.deletePost(wherePost);

        expect(repository.delete).toBeCalledTimes(1);
        expect(repository.delete).toBeCalledWith({
          id: wherePost.id,
          userId: wherePost.userId,
        });
      });

      it('삭제가 안되면 ForbiddenException 던지나?', async () => {
        const postId = 1;

        const wherePost = Post.deleteBy({ id: postId, userId: user.id });

        repository.delete = jest.fn().mockResolvedValue({ affected: 0 });

        await expect(async () => {
          await postsRepository.deletePost(wherePost);
        }).rejects.toThrowError(new ForbiddenException());
      });
    });
  });
});
