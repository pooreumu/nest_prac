// 📦 Package imports
import { ChronoUnit, LocalDateTime } from '@js-joda/core';
import { Column, Entity, ManyToOne } from 'typeorm';

// 🌏 Project imports
import { BaseEntity } from '@lib/entity/base-entity';

import { Post } from '@posts/entities/post.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column({
    type: 'varchar',
    comment: '댓글 내용',
  })
  content: string;

  @Column({
    type: 'varchar',
    comment: '댓글 작성자 아이디',
  })
  authorId: string;

  @Column({
    type: 'varchar',
    comment: '댓글 비밀번호',
    nullable: true,
  })
  password?: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  post: Post;

  static createComment(commentData) {
    const comment = new Comment();
    comment.post = commentData.post;
    comment.authorId = commentData.authorId;
    comment.password = commentData.password;
    comment.content = commentData.content;
    comment.createdAt = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
    comment.updatedAt = comment.createdAt;

    return comment;
  }
}
