// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CreatePostRequestDto } from './dtos/request.dtos/create-post-request.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostRequestDto } from './dtos/request.dtos/update-post-request.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

jest.mock('./boards.service');

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('비회원이 controller.createPost를 실행하면 boardService.createPost를 실행하나?', () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';

      const postData = new CreatePostRequestDto();
      postData.title = title;
      postData.content = content;
      postData.authorId = authorId;
      postData.password = password;

      const createPostDto = new CreatePostDto({
        title: postData.title,
        content: postData.content,
        authorId: postData.authorId,
        password: postData.password,
        membership: false,
      });

      controller.createPost(postData);

      expect(service.createPost).toBeCalledTimes(1);
      expect(service.createPost).toBeCalledWith(createPostDto);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('controller.getAllPosts 실행하면 boardService.getAllPosts 실행하나?', () => {
      controller.getAllPosts();

      expect(service.getAllPosts).toBeCalledTimes(1);
      expect(service.getAllPosts).toBeCalledWith();
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('controller.updatePost 실행하면 boardService.updatePost 실행하나?', () => {
      const postId = 1;
      const content = 'update content';
      const password = 'password';

      const postData = new UpdatePostRequestDto();
      postData.content = content;
      postData.password = password;

      const updatePostDto = new UpdatePostDto(postData);

      controller.updatePost(postId, postData);

      expect(service.updatePost).toBeCalledTimes(1);
      expect(service.updatePost).toBeCalledWith(postId, updatePostDto);
    });
  });
});
