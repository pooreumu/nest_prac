// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// 📦 Package imports
import { DataSource, Repository } from 'typeorm';

// 🌏 Project imports
import { CommentsRepository } from './comments.repository';
import { CommentsModule } from './comments.module';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import typeormConfig from '../../configs/typeorm.config';

describe('Comments', () => {
  let commentsRepository: CommentsRepository;
  let repository: Repository<Comment>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommentsModule,
        TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
      ],
    }).compile();

    commentsRepository = module.get<CommentsRepository>(CommentsRepository);
    repository = module.get<Repository<Comment>>('CommentRepository');
    dataSource = module.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  it('should be defined', () => {
    expect(commentsRepository).toBeDefined();
  });

  const commentData = {
    postId: 1,
    authorId: 'author',
    content: 'content',
    password: 'password',
  };

  describe('댓글 생성', () => {
    it('commentsRepository.createComment 실행하면 repository.insert 실행 함?', async () => {
      const createCommentDto = new CreateCommentDto();
      createCommentDto.post = commentData.postId;
      createCommentDto.authorId = commentData.authorId;
      createCommentDto.content = commentData.content;
      createCommentDto.password = commentData.password;

      repository.insert = jest.fn();
      await commentsRepository.createComment(createCommentDto.toEntity());

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(createCommentDto.toEntity());
    });
  });
});
