// ๐ฑ Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// ๐ Project imports
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

  describe('๊ฒ์๊ธ ์์ฑ: createPost', () => {
    it('๋นํ์์ด controller.createPost๋ฅผ ์คํํ๋ฉด postService.createPost๋ฅผ ์คํํ๋?', () => {
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

  describe('๊ฒ์๊ธ ์ ์ฒด ์กฐํ: getAllPosts', () => {
    it('controller.getAllPosts ์คํํ๋ฉด postService.getAllPosts ์คํํ๋?', () => {
      controller.getPosts();

      expect(service.getPosts).toBeCalledTimes(1);
      expect(service.getPosts).toBeCalledWith();
    });
  });

  describe('๊ฒ์๊ธ ์์ธ ์กฐํ: getOnePost', () => {
    it('controller.getOnePost ์คํํ๋ฉด postService.getOnePost ์คํํ๋?', () => {
      const postId = 1;

      controller.getPost(postId);

      expect(service.getPost).toBeCalledTimes(1);
      expect(service.getPost).toBeCalledWith(postId);
    });
  });

  describe('๊ฒ์๊ธ ์์ : updatePost', () => {
    it('controller.updatePost ์คํํ๋ฉด postService.updatePost ์คํํ๋?', () => {
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

  describe('๊ฒ์๊ธ ์ญ์ : removePost', () => {
    it('controller.removePost ์คํํ๋ฉด postService.removePost ์คํํ๋?', () => {
      const postId = 1;
      const password = 'password';

      controller.removePost(postId, password);

      expect(service.removePost).toBeCalledTimes(1);
      expect(service.removePost).toBeCalledWith(postId, password);
    });
  });
});
