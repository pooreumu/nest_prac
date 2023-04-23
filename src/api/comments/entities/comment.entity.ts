// 📦 Package imports
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// 🌏 Project imports

import { BaseTimeEntity } from '@lib/entity/base-time-entity';

import { Post } from '@posts/entities/post.entity';

import { CreateCommentData } from '@comments/interfaces/create-comment-data';

@Entity()
export class Comment extends BaseTimeEntity {
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
  @JoinColumn()
  post: Post;

  @Column({
    type: 'int',
    comment: '댓글이 달린 게시글 아이디',
  })
  postId: number;

  static createComment(commentData: CreateCommentData) {
    const comment = new Comment();
    comment.postId = commentData.postId;
    comment.authorId = commentData.authorId;
    comment.password = commentData.password;
    comment.content = commentData.content;

    return comment;
  }
}
