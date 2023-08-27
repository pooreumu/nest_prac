import { Test, TestingModule } from '@nestjs/testing';

import { CreatePostDto } from '@post/dto/create-post.dto';
import { DeletePostDto } from '@post/dto/delete-post.dto';
import { GetPostRequestDto } from '@post/dto/request.dto/get-post-request.dto';
import { UpdatePostDto } from '@post/dto/update-post.dto';
import {
  POST_REPOSITORY,
  PostRepository,
} from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { PostService } from '@post/service/post.service';

// import { CreatePostDto } from './dto/create-post.dto';
// import { DeletePostDto } from './dto/delete-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { PostService } from './post.service';
// import { PostTypeormRepository } from './repository/post.typeorm-repository';

jest.mock('@post/repository/post.typeorm-repository');

describe('PostsService', () => {
  let service: PostService;
  let repository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
