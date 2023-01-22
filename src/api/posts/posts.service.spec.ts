// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { GetPostDto } from './dto/get-post.dto';

jest.mock('./posts.repository');

describe('PostsService', () => {
  let service: PostsService;
  let repository: PostsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PostsService, PostsRepository],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<PostsRepository>(PostsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('게시글 작성: createPost', () => {
    it('service.createPost를 실행하면 this.boardsRepository.createPost를 실행하나?', () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';
      const membership = false;

      const postData = new CreatePostDto({
        title,
        content,
        authorId,
        membership,
        password,
      });

      const createBoard = postData.toEntity(LocalDateTime.now());

      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(createBoard);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('service.getAllPosts 실행하면 boardsRepository.getAllPosts 실행하나?', () => {
      const { select, order } = GetPostDto.toGetAllEntity();

      repository.getPosts = jest.fn().mockResolvedValue([]);

      service.getPosts();

      expect(repository.getPosts).toBeCalledTimes(1);
      expect(repository.getPosts).toBeCalledWith(select, order);
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('service.getOnePost 실행하면 boardsRepository.getOnePost 실행하나?', () => {
      const postId = 1;

      const { whereBoard, select } = GetPostDto.toGetOneEntity({
        postId,
      });

      repository.getPost = jest.fn().mockResolvedValue({});

      service.getPost(postId);

      expect(repository.getPost).toBeCalledTimes(1);
      expect(repository.getPost).toBeCalledWith(whereBoard, select);
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('service.updatePost 실행하면 boardsRepository.updatePost 실행하나?', () => {
      const postId = 1;
      const title = 'update title';
      const password = 'password';

      const postData = new UpdatePostDto({
        postId,
        title,
        password,
      });

      const { wherePost, updatePost } = postData.toEntity(LocalDateTime.now());

      service.updatePost(postData);

      expect(repository.updatePost).toBeCalledTimes(1);
      expect(repository.updatePost).toBeCalledWith(wherePost, updatePost);
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('service.removePost 실행하면 boardsRepository.removePost 실행하나?', () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = new DeletePostDto({ postId, password }).toEntity();

      service.removePost(postId, password);

      expect(repository.removePost).toBeCalledTimes(1);
      expect(repository.removePost).toBeCalledWith(whereBoard);
    });
  });
});
