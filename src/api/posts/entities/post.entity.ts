// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';
import { Column, Entity, OneToMany } from 'typeorm';

// 🌏 Project imports
import { BaseEntity } from '@lib/entity/base-entity';

import { Comment } from '@comments/entities/comment.entity';

@Entity()
export class Post extends BaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'varchar',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    name: 'author_id',
    type: 'varchar',
    comment: '게시글 작성자 아이디',
  })
  authorId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    comment: '게시글 비밀번호',
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
