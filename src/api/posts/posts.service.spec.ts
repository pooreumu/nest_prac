// ๐ฑ Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// ๐ฆ Package imports
import { LocalDateTime } from '@js-joda/core';

// ๐ Project imports
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

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
  describe('๊ฒ์๊ธ ์์ฑ: createPost', () => {
    it('service.createPost๋ฅผ ์คํํ๋ฉด this.postRepository.createPost๋ฅผ ์คํํ๋?', () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';

      const postData = new CreatePostDto({
        title,
        content,
        authorId,
        password,
      });

      const createPost = postData.toEntity(LocalDateTime.now());

      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(createPost);
    });
  });

  describe('๊ฒ์๊ธ ์ ์ฒด ์กฐํ: getAllPosts', () => {
    it('service.getAllPosts ์คํํ๋ฉด postRepository.getAllPosts ์คํํ๋?', () => {
      const { select, order } = GetPostDto.toGetAllEntity();

      repository.getPosts = jest.fn().mockResolvedValue([]);

      service.getPosts();

      expect(repository.getPosts).toBeCalledTimes(1);
      expect(repository.getPosts).toBeCalledWith(select, order);
    });
  });

  describe('๊ฒ์๊ธ ์์ธ ์กฐํ: getOnePost', () => {
    it('service.getOnePost ์คํํ๋ฉด postRepository.getOnePost ์คํํ๋?', () => {
      const postId = 1;

      const { wherePost, select } = GetPostDto.toGetOneEntity({
        postId,
      });

      repository.getPost = jest.fn().mockResolvedValue({});

      service.getPost(postId);

      expect(repository.getPost).toBeCalledTimes(1);
      expect(repository.getPost).toBeCalledWith(wherePost, select);
    });
  });

  describe('๊ฒ์๊ธ ์์ : updatePost', () => {
    it('service.updatePost ์คํํ๋ฉด postRepository.updatePost ์คํํ๋?', () => {
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

  describe('๊ฒ์๊ธ ์ญ์ : removePost', () => {
    it('service.removePost ์คํํ๋ฉด postRepository.removePost ์คํํ๋?', () => {
      const postId = 1;
      const password = 'password';

      const wherePost = new DeletePostDto({ postId, password }).toEntity();

      service.removePost(postId, password);

      expect(repository.removePost).toBeCalledTimes(1);
      expect(repository.removePost).toBeCalledWith(wherePost);
    });
  });
});
