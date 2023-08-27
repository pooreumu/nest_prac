import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Comment } from '@src/api/comment/entities/comment.entity';
import { User } from '@src/api/user/entities/user.entity';

import { BaseTimeEntity } from '@lib/entity/base-time-entity';

@Entity()
export class Post extends BaseTimeEntity {
  @Column({
    type: 'varchar',
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    comment: '게시글 작성자 아이디',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  static createPost(postData: {
    title: string;
    content: string;
    userId: number;
  }): Post {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    post.userId = postData.userId;

    return post;
  }

  static updatePost(postData: {
    postId: number;
    userId: number;
    title?: string;
    content?: string;
  }): Post {
    const post = new Post();
    post.id = postData.postId;
    post.userId = postData.userId;
    if (postData.title) post.title = postData.title;
    if (postData.content) post.content = postData.content;

    return post;
  }

  static byPk(postData: { id: number }): Post {
    const post = new Post();
    post.id = postData.id;

    return post;
  }

  static deleteBy(postData: { id: number; userId: number }): Post {
    const post = new Post();
    post.id = postData.id;
    post.userId = postData.userId;

    return post;
  }
}
