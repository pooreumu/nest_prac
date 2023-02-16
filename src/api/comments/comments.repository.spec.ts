// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// 📦 Package imports
import { DataSource, Repository } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import typeormConfig from '../../configs/typeorm.config';
import { CommentsRepository } from './comments.repository';
import { CommentsModule } from './comments.module';
import { Post } from '../posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
    const posts = {
      title: 'test title',
      content: 'test content',
      authorId: 'ㅇㅇ',
      password: 'asdf1234',
      createdAt: LocalDateTime.of(2023, 2, 16, 19, 10, 15),
    };
    const post = Post.createPost(posts);
    await dataSource.getRepository(Post).insert(post);
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

  const createCommentDto = new CreateCommentDto();
  createCommentDto.post = commentData.postId;
  createCommentDto.authorId = commentData.authorId;
  createCommentDto.content = commentData.content;
  createCommentDto.password = commentData.password;

  describe('댓글 생성', () => {
    it('commentsRepository.createComment 실행하면 repository.insert 실행 함?', async () => {
      await commentsRepository.createComment(createCommentDto.toEntity());

      const comment = await repository.findOne({
        where: { id: 1 },
        relations: { post: true },
      });

      expect(comment.authorId).toBe(commentData.authorId);
      expect(comment.content).toBe(commentData.content);
      expect(comment.post.id).toBe(commentData.postId);
    });
  });

  describe('댓글 수정', () => {
    it('commentsRepository.update 실행하면 repository.update 실행 함?', async () => {
      const content = 'update comment content';
      const id = 1;

      const updateCommentDto = new UpdateCommentDto();
      updateCommentDto.content = content;
      updateCommentDto.password = commentData.password;

      await repository.insert(createCommentDto.toEntity());
      await commentsRepository.updateComment(updateCommentDto.toEntity(id));

      const comment = await repository.findOne({ where: { id: 1 } });

      expect(comment.id).toBe(id);
      expect(comment.content).toBe(content);
    });
  });
});
