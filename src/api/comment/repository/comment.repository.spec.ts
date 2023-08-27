import { Test, TestingModule } from '@nestjs/testing';

import { DataSource, Repository } from 'typeorm';

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { Post } from '@post/entities/post.entity';

import { CreateCommentDto } from '@comment/dto/create-comment.dto';

import { CommentModule } from '../comment.module';
import { CreateCommentRequestDto } from '../dto/request.dto/create-comment-request.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

import { User } from '@user/entities/user.entity';

import { CommentRepository } from './comment.repository';

describe('Comments', () => {
  let commentsRepository: CommentRepository;
  let repository: Repository<Comment>;
  let dataSource: DataSource;
  let user: User;
  let post: Post;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommentModule, TypeormConfigModule],
    }).compile();

    commentsRepository = module.get<CommentRepository>(CommentRepository);
    repository = module.get<Repository<Comment>>('CommentRepository');
    dataSource = module.get<DataSource>(DataSource);

    user = await dataSource
      .getRepository(User)
      .save(await User.from('nickname', 'password'));

    post = await dataSource.getRepository(Post).save(
      Post.createPost({
        title: 'test title',
        content: 'test content',
        userId: user.id,
      }),
    );
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  it('should be defined', () => {
    expect(commentsRepository).toBeDefined();
  });

  describe('댓글 생성', () => {
    it('commentsRepository.createComment 실행하면 repository.insert 실행 함?', async () => {
      const commentData = {
        postId: post.id,
        userId: user.id,
        content: 'content',
      };

      const createCommentRequestDto = new CreateCommentRequestDto();
      createCommentRequestDto.content = commentData.content;

      await commentsRepository.createComment(
        createCommentRequestDto
          .toCreateCommentDto(commentData.postId, commentData.userId)
          .toEntity(),
      );

      const comment = await repository.findOne({
        where: { id: 1 },
        relations: { post: true },
      });

      expect(comment?.userId).toBe(commentData.userId);
      expect(comment?.content).toBe(commentData.content);
      expect(comment?.post.id).toBe(commentData.postId);
    });
  });

  describe('댓글 수정', () => {
    it('commentsRepository.update 실행하면 repository.update 실행 함?', async () => {
      const commentData = {
        postId: post.id,
        userId: user.id,
        content: 'content',
      };

      const createCommentDto = new CreateCommentDto(commentData);

      const content = 'update comment content';
      const id = 1;

      const comment1 = await repository.save(createCommentDto.toEntity());
      const updateCommentDto = new UpdateCommentDto({
        id: comment1.id,
        userId: user.id,
        content,
      });

      await commentsRepository.updateComment(updateCommentDto.toEntity());

      const comment = await repository.findOne({ where: { id: 1 } });

      expect(comment?.id).toBe(id);
      expect(comment?.content).toBe(content);
    });
  });
});
