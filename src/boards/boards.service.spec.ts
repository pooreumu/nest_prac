import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
jest.mock('./boards.repository');

import { CreatePostDto } from './dtos/create-post.dto';

describe('BoardsService', () => {
  let service: BoardsService;
  let repository: BoardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [BoardsService, BoardsRepository],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    repository = module.get<BoardsRepository>(BoardsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createPost', () => {
    const postData: CreatePostDto = {
      title: 'title',
      content: 'content',
      authorId: 'author',
      authorPassword: 'password',
    };

    it('service.createPost를 실행하면 this.boardsRepository.createPost를 실행하나?', () => {
      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(postData);
    });
  });
});
