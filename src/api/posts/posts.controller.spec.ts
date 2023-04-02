// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { GetPostRequestDto } from '@posts/dto/request.dto/get-post-request.dto';

import { CreatePostRequestDto } from './dto/request.dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/request.dto/update-post-request.dto';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

jest.mock('./posts.service');

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('비회원이 controller.createPost를 실행하면 postService.createPost를 실행하나?', () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';

      const postData = new CreatePostRequestDto();
      postData.title = title;
      postData.content = content;
      postData.authorId = authorId;
      postData.password = password;

      const createPostDto = postData.toCreatePostDto();

      controller.createPost(postData);

      expect(service.createPost).toBeCalledTimes(1);
      expect(service.createPost).toBeCalledWith(createPostDto);
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
      const content = 'update content';
      const password = 'password';

      const postData = new UpdatePostRequestDto();
      postData.content = content;
      postData.password = password;

      const updatePostDto = postData.toUpdatePostDto(postId);

      controller.updatePost(postId, postData);

      expect(service.updatePost).toBeCalledTimes(1);
      expect(service.updatePost).toBeCalledWith(updatePostDto);
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('controller.removePost 실행하면 postService.removePost 실행하나?', () => {
      const postId = 1;
      const password = 'password';

      controller.removePost(postId, password);

      expect(service.removePost).toBeCalledTimes(1);
      expect(service.removePost).toBeCalledWith(postId, password);
    });
  });
});
