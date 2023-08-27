import { Test, TestingModule } from '@nestjs/testing';

import { GetPostRequestDto } from '@src/api/post/dto/request.dto/get-post-request.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';

jest.mock('./repository/post.repository');

describe('PostsService', () => {
  let service: PostService;
  let repository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PostService, PostRepository],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('service.createPost를 실행하면 this.postRepository.createPost를 실행하나?', () => {
      const title = 'title';
      const content = 'content';
      const userId = 1;

      const postData = new CreatePostDto({
        title,
        content,
        userId,
      });

      const createPost = postData.toEntity();

      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(createPost);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('service.getAllPosts 실행하면 postRepository.getAllPosts 실행하나?', () => {
      const getPostRequestDto = new GetPostRequestDto();

      repository.getPosts = jest.fn().mockResolvedValue([[], 0]);

      service.getPosts(getPostRequestDto);

      expect(repository.getPosts).toBeCalledTimes(1);
      expect(repository.getPosts).toBeCalledWith(
        getPostRequestDto.toEntityForPagination(),
      );
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('service.getOnePost 실행하면 postRepository.getOnePost 실행하나?', () => {
      const postId = 1;

      repository.getPost = jest.fn().mockResolvedValue({});

      service.getPost(postId);

      expect(repository.getPost).toBeCalledTimes(1);
      expect(repository.getPost).toBeCalledWith(postId);
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('service.updatePost 실행하면 postRepository.updatePost 실행하나?', () => {
      const postId = 1;
      const userId = 1;
      const title = 'update title';

      const postData = new UpdatePostDto({
        postId,
        userId,
        title,
      });

      const { wherePost, updatePost } = postData.toEntity();

      service.updatePost(postData);

      expect(repository.updatePost).toBeCalledTimes(1);
      expect(repository.updatePost).toBeCalledWith(wherePost, updatePost);
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('service.removePost 실행하면 postRepository.removePost 실행하나?', () => {
      const postId = 1;
      const userId = 1;

      const wherePost = new DeletePostDto({ postId, userId }).toEntity();

      service.removePost(postId, userId);

      expect(repository.removePost).toBeCalledTimes(1);
      expect(repository.removePost).toBeCalledWith(wherePost);
    });
  });
});
