// 📦 Package imports
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// 🌏 Project imports
import { CreateCommentData } from '@src/api/comment/interfaces/create-comment-data';
import { Post } from '@src/api/post/entities/post.entity';
import { User } from '@src/api/user/entities/user.entity';

import { BaseTimeEntity } from '@lib/entity/base-time-entity';

@Entity()
export class Comment extends BaseTimeEntity {
  @Column({
    type: 'varchar',
    comment: '댓글 내용',
  })
  content: string;

  @Column({
    comment: '댓글 작성자 아이디',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @Column({
    comment: '댓글이 달린 게시글 아이디',
  })
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  post: Post;

  static createComment(commentData: CreateCommentData) {
    const comment = new Comment();
    comment.postId = commentData.postId;
    comment.userId = commentData.userId;
    comment.content = commentData.content;

    return comment;
  }

  static updateComment(commentId: number, content: string, userId: number) {
    const comment = new Comment();
    comment.id = commentId;
    comment.content = content;
    comment.userId = userId;

    return comment;
  }
}
