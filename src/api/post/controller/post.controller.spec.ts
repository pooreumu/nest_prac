import { Test, TestingModule } from '@nestjs/testing';

import { PostController } from '@post/controller/post.controller';
import { CreatePostRequestDto } from '@post/dto/request.dto/create-post-request.dto';
import { GetPostRequestDto } from '@post/dto/request.dto/get-post-request.dto';
import { UpdatePostRequestDto } from '@post/dto/request.dto/update-post-request.dto';
import { PostService } from '@post/service/post.service';
import { CreatePostUseCase } from '@post/use-case/create-post.use-case';

jest.mock('@post/service/post.service');
jest.mock('@post/use-case/create-post.use-case');

describe('PostsController', () => {
  let module: TestingModule;
  let controller: PostController;
  let service: PostService;
  let useCase: CreatePostUseCase;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, CreatePostUseCase],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    useCase = module.get<CreatePostUseCase>(CreatePostUseCase);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('게시글 작성: createPost', () => {
    it('비회원이 controller.createPost를 실행하면 postService.createPost를 실행하나?', () => {
      const title = 'title';
      const content = 'content';
      const user = { id: 1, nickname: 'nickname' };

      const postData = new CreatePostRequestDto();
      postData.title = title;
      postData.content = content;

      const createPostDto = postData.toCreatePostDto(user.id);

      controller.createPost(postData, user);

      expect(useCase.execute).toBeCalledTimes(1);
      expect(useCase.execute).toBeCalledWith(createPostDto);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('controller.getAllPosts 실행하면 postService.getAllPosts 실행하나?', () => {
      const getPostRequestDto = new GetPostRequestDto();
      controller.getPosts(getPostRequestDto);

      expect(service.getPosts).toBeCalledTimes(1);
      expect(service.getPosts).toBeCalledWith(getPostRequestDto);
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('controller.getOnePost 실행하면 postService.getOnePost 실행하나?', () => {
      const postId = 1;

      controller.getPost(postId);

      expect(service.getPost).toBeCalledTimes(1);
      expect(service.getPost).toBeCalledWith(postId);
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('controller.updatePost 실행하면 postService.updatePost 실행하나?', () => {
      const postId = 1;
      const user = { id: 1, nickname: 'nickname' };
      const content = 'update content';

      const postData = new UpdatePostRequestDto();
      postData.content = content;

      const updatePostDto = postData.toUpdatePostDto(postId, user.id);

      controller.updatePost(postId, postData, user);

      expect(service.updatePost).toBeCalledTimes(1);
      expect(service.updatePost).toBeCalledWith(updatePostDto);
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('controller.removePost 실행하면 postService.removePost 실행하나?', () => {
      const postId = 1;
      const user = { id: 1, nickname: 'nickname' };

      controller.removePost(postId, user);

      expect(service.removePost).toBeCalledTimes(1);
      expect(service.removePost).toBeCalledWith(postId, user.id);
    });
  });
});
