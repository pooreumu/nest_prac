import { Test, TestingModule } from '@nestjs/testing';

import { DeletePostDto } from '@post/dto/delete-post.dto';
import { GetPostRequestDto } from '@post/dto/request.dto/get-post-request.dto';
import { UpdatePostDto } from '@post/dto/update-post.dto';
import {
  POST_REPOSITORY,
  PostRepository,
} from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { PostService } from '@post/service/post.service';

jest.mock('@post/repository/post.typeorm-repository');

describe('PostsService', () => {
  let module: TestingModule;
  let service: PostService;
  let repository: PostRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [],
      providers: [
        PostService,
        {
          provide: POST_REPOSITORY,
          useClass: PostTypeormRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<PostRepository>(POST_REPOSITORY);
  });

  afterEach(async () => {
    await module.close();
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

      service.updatePost(postData);

      expect(repository.updatePost).toBeCalledTimes(1);
      expect(repository.updatePost).toBeCalledWith(postData.toEntity());
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('service.removePost 실행하면 postRepository.removePost 실행하나?', () => {
      const postId = 1;
      const userId = 1;

      const wherePost = new DeletePostDto({ postId, userId }).toEntity();

      service.removePost(postId, userId);

      expect(repository.deletePost).toBeCalledTimes(1);
      expect(repository.deletePost).toBeCalledWith(wherePost);
    });
  });
});
