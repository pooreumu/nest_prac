// π¦ Package imports
import { ChronoUnit, LocalDateTime } from '@js-joda/core';
import { Column, Entity, ManyToOne } from 'typeorm';

// π Project imports
import { Post } from '@posts/entities/post.entity';

import { BaseEntity } from '@lib/entity/BaseEntity';

@Entity()
export class Comment extends BaseEntity {
  @Column({
    type: 'varchar',
    comment: 'λκΈ λ΄μ©',
  })
  content: string;

  @Column({
    type: 'varchar',
    comment: 'λκΈ μμ±μ μμ΄λ',
  })
  authorId: string;

  @Column({
    type: 'varchar',
    comment: 'λκΈ λΉλ°λ²νΈ',
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
