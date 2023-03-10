// π± Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// π¦ Package imports
import { LocalDateTime } from '@js-joda/core';
import { DataSource, Repository } from 'typeorm';

// π Project imports
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { Post } from '@posts/entities/post.entity';

import { CommentsModule } from './comments.module';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

describe('Comments', () => {
  let commentsRepository: CommentsRepository;
  let repository: Repository<Comment>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommentsModule, TypeormConfigModule],
    }).compile();

    commentsRepository = module.get<CommentsRepository>(CommentsRepository);
    repository = module.get<Repository<Comment>>('CommentRepository');
    dataSource = module.get<DataSource>(DataSource);
    const posts = {
      title: 'test title',
      content: 'test content',
      authorId: 'γγ',
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

  describe('λκΈ μμ±', () => {
    it('commentsRepository.createComment μ€ννλ©΄ repository.insert μ€ν ν¨?', async () => {
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

  describe('λκΈ μμ ', () => {
    it('commentsRepository.update μ€ννλ©΄ repository.update μ€ν ν¨?', async () => {
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
