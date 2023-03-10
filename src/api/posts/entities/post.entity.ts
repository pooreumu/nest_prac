// π¦ Package imports
import { LocalDateTime } from '@js-joda/core';
import { Column, Entity, OneToMany } from 'typeorm';

// π Project imports
import { BaseEntity } from '@lib/entity/BaseEntity';

import { Comment } from '@comments/entities/comment.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    comment: 'κ²μκΈ μ λͺ©',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'varchar',
    comment: 'κ²μκΈ λ΄μ©',
  })
  content: string;

  @Column({
    name: 'author_id',
    type: 'varchar',
    comment: 'κ²μκΈ μμ±μ μμ΄λ',
  })
  authorId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    comment: 'κ²μκΈ λΉλ°λ²νΈ',
    nullable: true,
    select: false,
  })
  password: string;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  static createPost(postData: {
    title: string;
    content: string;
    authorId: string;
    password: string;
    createdAt: LocalDateTime;
  }): Post {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    post.authorId = postData.authorId;
    post.password = postData.password;
    post.createdAt = postData.createdAt;
    post.updatedAt = postData.createdAt;

    return post;
  }

  static updatePost(postData: {
    postId: number;
    password: string;
    title?: string;
    content?: string;
    updatedAt: LocalDateTime;
  }): { wherePost: Post; updatePost: Post } {
    const wherePost = new Post();
    wherePost.id = postData.postId;
    wherePost.password = postData.password;

    const updatePost = new Post();
    updatePost.title = postData.title;
    updatePost.content = postData.content;
    updatePost.updatedAt = postData.updatedAt;

    return { wherePost: wherePost, updatePost: updatePost };
  }

  static byPk(postData: { id: number }): Post {
    const post = new Post();
    post.id = postData.id;

    return post;
  }

  static deleteBy(postData: { id: number; password: string }): Post {
    const post = new Post();
    post.id = postData.id;
    post.password = postData.password;

    return post;
  }
}
